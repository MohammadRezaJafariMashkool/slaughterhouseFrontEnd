import React, { useState } from 'react';
import './SignupModal.css';
import CloseBtnIcon from '../../Assets/cart_cross_icon.png';
const SignupModal = () => {
  // State for shopping cart items count
  const [cartCount, setCartCount] = useState(0);

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
    return quantities.reduce((total, quantity, index) => {
      return total + (quantity * prices[index]); // Multiply price by quantity and add to total
    }, 0);
  };

  return (
    <div
      className="SignupModal"
      style={{ display: isModalOpen ? 'block' : 'none' }}
    >
      <div className="SignupModal-overlay" onClick={closeModal}></div>
      <div className="SignupModal-content">
        <h2>سبد خرید</h2>

        <div className="cartproducts-list-container">
          {/* First Table */}
          <div className="products-list-small-card">
            <div className="header-small-card-cart-prices">
              <p>گوشت گوساله</p>
            </div>
            <div className="body-small-card-cart-prices">
              <div className="cart-prices-right">
                <div className="cart-prices-item-right"><p>ران گوساله</p></div>
                <div className="cart-prices-item-right"><p>سردست گوساله</p></div>
                <div className="cart-prices-item-right"><p>راسته گوساله</p></div>
                <div className="cart-prices-item-right"><p>گردن گوساله</p></div>
                <div className="cart-prices-item-right"><p>فیله گوساله</p></div>
                <div className="cart-prices-item-right"><p>قلوه گاه گوساله</p></div>
                <div className="cart-prices-item-right"><p>لاشه گوساله</p></div>
              </div>
              <div className="cart-prices-middle">
                {prices.slice(0, 7).map((price, idx) => (
                  <div key={idx} className="cart-prices-item-middle"><p>{price}</p><p>تومان</p></div>
                ))}
              </div>
              <div className="cart-prices-left">
                {quantities.slice(0, 7).map((quantity, idx) => (
                  <div key={idx} className="cart-prices-item-left">
                    <input
                      className="product-amount-txb"
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const value = Math.max(0, Math.min(999, Number(e.target.value))); // Restrict value between 0 and 999
                        handleInputChange(idx, value);
                      }}
                      onKeyDown={(e) => {
                        // Prevent invalid input
                        if (
                          e.key === '-' ||
                          e.key === 'e' ||
                          e.key === '.'
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <p>کیلو</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Table */}
          <div className="products-list-small-card">
            <div className="header-small-card-cart-prices">
              <p>گوشت گوسفند</p>
            </div>
            <div className="body-small-card-cart-prices">
              <div className="cart-prices-right">
                <div className="cart-prices-item-right"><p>ران گوسفند</p></div>
                <div className="cart-prices-item-right"><p>سردست گوسفند</p></div>
                <div className="cart-prices-item-right"><p>راسته گوسفند</p></div>
                <div className="cart-prices-item-right"><p>گردن گوسفند</p></div>
                <div className="cart-prices-item-right"><p>فیله گوسفند</p></div>
                <div className="cart-prices-item-right"><p>قلوه گاه گوسفند</p></div>
                <div className="cart-prices-item-right"><p>لاشه گوسفند</p></div>
              </div>
              <div className="cart-prices-middle">
                {prices.slice(7).map((price, idx) => (
                  <div key={idx} className="cart-prices-item-middle"><p>{price}</p><p>تومان</p></div>
                ))}
              </div>
              <div className="cart-prices-left">
                {quantities.slice(7).map((quantity, idx) => (
                  <div key={idx + 7} className="cart-prices-item-left">
                    <input
                      className="product-amount-txb"
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const value = Math.max(0, Math.min(999, Number(e.target.value))); // Restrict value between 0 and 999
                        handleInputChange(idx + 7, value);
                      }}
                      onKeyDown={(e) => {
                        // Prevent invalid input
                        if (
                          e.key === '-' ||
                          e.key === 'e' ||
                          e.key === '.'
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <p>کیلو</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="total-container">
          <p>مبلغ کل: {calculateTotal().toLocaleString()} تومان</p><div className="checkout-btn">تسویه حساب</div>
        </div>

        <img src={CloseBtnIcon} className='SignupModal-close-btn' onClick={closeModal}></img>
      </div>
    </div>
  );
};

export default SignupModal;
