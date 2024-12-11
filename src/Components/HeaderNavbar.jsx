import React, { useState } from 'react';
import './HeaderNavbar.css';
import siteIcon from '../Assets/LogoBigDark.png';
import Cart from './CartModal';
import Order from './OrdersModal';
import Signin from './SigninModal';
import Signup from './SignupModal';

import productIcon from '../Assets/Icons/NavPrtDark.png';
import adsIcon from '../Assets/Icons/NavAdsDark.png';
import NavNewAd from '../Assets/Icons/NavNewAdDark.png';
import scheduleIcon from '../Assets/Icons/NavShlDark.png';
import aboutUsIcon from '../Assets/Icons/NavAbtUsDark.png';
import PriceIcon from '../Assets/Icons/PriceIconDark.png';
import OffersIcon from '../Assets/OffersIcon.png';
import CartIcon from '../Assets/Icons/ShopingCardDrak.png';
import UserIcon from '../Assets/Icons/UserIconDrak.png';

const HeaderNavbar = () => {
  // State for selected navigation button
  const [selectedButton, setSelectedButton] = useState('home');
  
  // State for shopping cart items count
  const [cartCount, setCartCount] = useState(0);

  // State for modal visibility
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSighnUpModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Handle navigation button click
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  // Toggle Cart modal visibility
  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };  
  
  // Toggle Cart modal visibility
  const toggleUserModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  return (
    <div className="header">
        <div className="header-offers">
          <a className='header-offers-button' href="#productprice">
            <img src={OffersIcon} alt="" />
            <h2>پیشنهادات شگفت انگیز</h2>
          </a>
        </div>
        <div className="navbar">
          <a className="header-site-icon" href="#home"><img src={siteIcon} alt=""/></a>
          <div className="header-navigation">
            <a className={`nav-button ${selectedButton === 'products' ? 'redGrad nav-button' : 'nav-button'}`} onClick={() => handleButtonClick('products')} href="#products"><img src={productIcon} alt="" /><p>محصولات</p></a>
            <a className={`nav-button ${selectedButton === 'productsprice' ? 'redGrad nav-button' : 'nav-button'}`}onClick={() => handleButtonClick('productsprice')} href="#productprice">
              <img src={PriceIcon} alt="" /><p>قیمت محصولات</p>
            </a>
            <a className={`nav-button ${selectedButton === 'schedule' ? 'redGrad nav-button' : 'nav-button'}`} onClick={() => handleButtonClick('schedule')} href="#schedule">
                <img src={scheduleIcon} alt="" /><p>برنامه زمانی</p>
            </a>
            <a className={`nav-button ${selectedButton === 'ads' ? 'redGrad nav-button' : 'nav-button'}`}onClick={() => handleButtonClick('ads')} href="#ads">
                <img src={adsIcon} alt="" /><p>آگهی ها</p>
            </a>
            <a className={`nav-button ${selectedButton === 'adadd' ? 'redGrad nav-button' : 'nav-button'}`} onClick={() => handleButtonClick('adadd')}href="#adadd">
              <img src={NavNewAd} alt="" /><p>ایجاد آگهی</p>
              </a>          
            <a className={`nav-button ${selectedButton === 'about' ? 'redGrad nav-button' : 'nav-button'}`} onClick={() => handleButtonClick('about')} href="#about">
              <img src={aboutUsIcon} alt="" /><p>درباره ما</p>
              </a>
            <div className="nav-button" onClick={toggleCartModal}><img src={CartIcon} alt=""/><p>سبد خرید ({cartCount})</p></div>

            <div className="nav-button" onClick={toggleUserModal}><img src={UserIcon} alt=""/><p>ورود/ثبتنام</p></div>
          </div>
        </div>

      {/* Open Shopping Cart */}
      {isCartModalOpen && (
        <Cart/>
      )}

      {/* Open Shopping Cart */}
      {isCartModalOpen && (
        <Order/>
      )}

      {/* Open Shopping Cart */}
      {isCartModalOpen && (
        <Signin/>
      )}
      
      {/* Open Shopping Cart */}
      {isCartModalOpen && (
        <Signup/>
      )}
    </div>
  );
};

export default HeaderNavbar;
