import React, { useContext, useState } from 'react';
import './CartModal.css';
import CloseBtnIcon from '../../Assets/cart_cross_icon.png';
import {ShopContext} from '../../Context/ShopContext';

const CartModal = () => {

  const {AllProducts, cartItems, addToCart, removeFromCart} = useContext(ShopContext)

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true); // Assuming it starts visible

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Prices of products (7 for each table)
  const prices = Array(14).fill(1000000); // Replace with actual prices as needed
  
  // States for product quantities
  const [quantities, setQuantities] = useState(
    Array(14).fill(0) // Default quantities for 14 products (7 for each table)
  );

  // Handles input change
  const handleInputChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value ? parseInt(value) || 0 : 0; // Update quantity
    setQuantities(newQuantities);
  };

  // Calculate total price
  const calculateTotal = () => {
      let totalPrice = 0;
      AllProducts.map((e)=>{
        if(cartItems[e.id]>0){
          totalPrice += e.new_price*cartItems[e.id]
        }
      })
    return totalPrice
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
                                <img className="product-img" src={item.image} alt="" />
                                <p className="product-name">{item.name}</p>
                                <p className="product-price">{item.new_price}</p>
                                <p className="product-price-sign">تومان مقدار:</p>                          
                                <input className="product-amount-txb" type="number" defaultValue={cartItems[item.id]>0?cartItems[item.id]:0} onChange={(e) => handleInputChange(item.id, e.target.value)}/>
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
                                  <img className="product-img" src={item.image} alt="" />
                                  <p className="product-name">{item.name}</p>
                                  <p className="product-price">{item.new_price}</p>
                                  <p className="product-price-sign">تومان مقدار:</p>                          
                                  <input className="product-amount-txb" type="number" defaultValue={cartItems[item.id]>0?cartItems[item.id]:0} onChange={(e) => handleInputChange(item.id, e.target.value)}/>
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
          <p>مبلغ کل: {calculateTotal().toLocaleString()} تومان</p><div className="checkout-btn">تسویه حساب</div>
        </div>

        <img src={CloseBtnIcon} className='cartmodal-close-btn' onClick={closeModal}></img>
      </div>
    </div>
  );
};

export default CartModal;
