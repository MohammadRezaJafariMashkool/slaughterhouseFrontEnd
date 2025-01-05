import React, { useContext, useState } from 'react';
import './CartModal.css';
import {ShopContext} from '../../Context/ShopContext';
import { BackendUrl, ImagesUrl } from '../../Constants/userConstants';

const CartModal = () => {

  const {AllProducts, cartItems, addToCart, removeFromCart, getTotalCartAmount, clearCart} = useContext(ShopContext)

// Retrieve auth token
  const authToken = localStorage.getItem('auth-token'); 

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true); 

  // Close the modal
  const closeModal = () => {setIsModalOpen(false);}; 

  // Checout
  const checkOut = async ()=>{
      if (!authToken) {
        alert('شما باید وارد حساب کاربری خود شوید.');
        return;
      }
  
      if (getTotalCartAmount === 0) {
        alert('سبد خرید شما خالیست.');
        return;
      }

      const cardProductsList = {
        orderItems: AllProducts.filter(item => cartItems[item._id] > 0).map(item => ({
          name: item.name,
          quantity: cartItems[item._id],
          image: item.image,
          price: item.new_price,
          product: item._id,
        })),
        shippingInfo: {
          address: localStorage.getItem('user-address'),
          city: localStorage.getItem('user-city'),
          tel: localStorage.getItem('user-tel'),
          postalCode: localStorage.getItem('user-postal-code'),
          country: "Iran",
        },
        paymentInfo: {
          id: "PayID",
          status: "Successful",
        },
        //paidAt: "2025/01/01",
        itemsPrice: getTotalCartAmount(),
        tax: "0",
        shippingPrice: "2",
        totalPrice: getTotalCartAmount(),
      };
      const jsonPayload = JSON.stringify(cardProductsList); 
      try {
        // Step 1: Upload images
        //const formData = new FormData();
  

        const response = await fetch(`${BackendUrl}/order/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken,
          },
          body: jsonPayload,
        });
  
        const responseData = await response.json();
  
        if (responseData.success) {
          clearCart();
          alert('سفارش با موفقیت ثبت شد!');
        } else {
          alert('خطایی رخ داده است: ' + responseData.message);
        }
      } catch (error) {
        console.error('Error submitting ad:', error);
        alert('خطایی در ارسال سفارش رخ داده است.');
      }

  }
  
  return (
    <div
      className="cartmodal"
      style={{ display: isModalOpen ? 'block' : 'none' }}
    >
      <div className="cartmodal-overlay" onClick={closeModal}></div>
      <div className="cartmodal-content">
        <h2>سبد خرید</h2>
        <div className="products-list-container" id="productprice">
        
          {/* Cow Products Table */}
          <div className="products-list-small-card">
            <div className="header-small-card-prices">
              <p>گوشت گوساله</p>
            </div>
            <div className="prices-table-body">
              {AllProducts.map((item, i)=>{
                if(item.category === "Cow"){
                  return <div  className="prices-item-container">
                            <div key={i} className="prices-item">
                              <img className="product-img" src={ImagesUrl+item.image} alt="" />
                              <p className="product-name">{item.name}</p>
                              <p className="product-price">{item.new_price.toLocaleString()}</p>
                              <p className="product-price-sign">تومان مقدار:</p>                          
                              <input className="product-amount-txb" type="number" defaultValue={cartItems[item._id]>0?cartItems[item._id]:0} onChange={(e) => addToCart(item._id, e.target.value)} maxlength="3"/>
                              <p className="product-kilo">کیلو</p>
                            </div>   
                        </div>
                }
                else{
                  return null
                }
              })}
            </div>
          </div>

          {/* Lamb Products Table */}
          <div className="products-list-small-card">
            <div className="header-small-card-prices">
              <p>گوشت گوسفند</p>
            </div>
            <div className="prices-table-body">
              {AllProducts.map((item, i)=>{
                    if(item.category === "Sheep"){
                      return <div  className="prices-item-container">
                                <div key={i} className="prices-item">
                                  <img className="product-img" src={ImagesUrl+item.image} alt="" />
                                  <p className="product-name">{item.name}</p>
                                  <p className="product-price">{item.new_price.toLocaleString()}</p>
                                  <p className="product-price-sign">تومان مقدار:</p>                          
                                  <input className="product-amount-txb" type="number" defaultValue={cartItems[item._id]>0?cartItems[item._id]:0} onChange={(e) => addToCart(item._id, e.target.value)} maxlength="3"/>
                                  <p className="product-kilo">کیلو</p>
                                </div>
                            </div>
                    }
                    else{
                      return null
                    }
                  })}
            </div>
          </div>
        
        </div>

        {/* Total */}
        <div className="total-container">
          <p>مبلغ کل: {getTotalCartAmount().toLocaleString()} تومان</p><div className="checkout-btn" onClick={checkOut}>تسویه حساب</div>
        </div>

        <span className="modal-close-btn" onClick={closeModal}>
                  &times;
         </span>
      </div>
    </div>
  );
};

export default CartModal;
