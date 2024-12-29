import React, { useContext, useState } from 'react';
import './CartModal.css';
import CloseBtnIcon from '../../Assets/cart_cross_icon.png';
import {ShopContext} from '../../Context/ShopContext';
import { ImagesUrl } from '../../Constants/userConstants';

const CartModal = () => {

  const {AllProducts, cartItems, addToCart, removeFromCart, getTotalCartAmount} = useContext(ShopContext)

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true); // Assuming it starts visible

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  }; 
  
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
                              <img className="product-img" src={ImagesUrl+item.images[0].url} alt="" />
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
                                  <img className="product-img" src={ImagesUrl+item.images[0].url} alt="" />
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
          {/* <p>مبلغ کل: {calculateTotal().toLocaleString()} تومان</p><div className="checkout-btn">تسویه حساب</div> */}
          <p>مبلغ کل: {getTotalCartAmount().toLocaleString()} تومان</p><div className="checkout-btn">تسویه حساب</div>
        </div>

        <span className="modal-close-btn" onClick={closeModal}>
                  &times;
         </span>
      </div>
    </div>
  );
};

export default CartModal;
