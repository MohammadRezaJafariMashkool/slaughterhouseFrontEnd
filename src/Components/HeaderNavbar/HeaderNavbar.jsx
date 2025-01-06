import React, { useState, useContext } from 'react';
import './HeaderNavbar.css';
import { ShopContext } from '../../Context/ShopContext'; 
import siteIcon from '../../Assets/LogoBigDark.png';
import siteIconWhite from '../../Assets/LogoBigLight.png';

import productIcon from '../../Assets/Icons/NavPrtDark.png';
import adsIcon from '../../Assets/Icons/NavAdsDark.png';
import NavNewAd from '../../Assets/Icons/NavNewAdDark.png';
import scheduleIcon from '../../Assets/Icons/NavShlDark.png';
import aboutUsIcon from '../../Assets/Icons/NavAbtUsDark.png';
import PriceIcon from '../../Assets/Icons/PriceIconDark.png';
import OffersIcon from '../../Assets/OffersIcon.png';
import CartIcon from '../../Assets/Icons/ShopingCardDrak.png';
import UserIcon from '../../Assets/Icons/UserIconDrak.png';
import logOutIcon from '../../Assets/Icons/logout.png';
import { BackendUrl } from '../../Constants/userConstants';

const HeaderNavbar = ({ onToggleCartModal, onToggleProfileModal, onToggleSignInModal, onToggleSignUpModal, onToggleOrderModal }) => {
  // State for selected navigation button
  const [selectedButton, setSelectedButton] = useState('home');

  // Fetch cartItems from ShopContext
  const { getTotalCartItems } = useContext(ShopContext);

  // Handle navigation button click
  const handleButtonClick = (buttonName) => {setSelectedButton(buttonName);};

// Log out
const logOut = async () => {
  try {
      const response = await fetch(`${BackendUrl}/logout`, {
          method: 'POST', // Change to POST if required, though GET may suffice with current backend
          credentials: 'include', // Ensures cookies are sent with the request
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const responseData = await response.json();

      if (responseData.success) {
          // Clear local storage
          localStorage.removeItem('user-name');
          localStorage.removeItem('user-address');
          localStorage.removeItem('user-postal-code');
          localStorage.removeItem('user-city');
          localStorage.removeItem('user-tel');
          localStorage.removeItem('user-email');
          localStorage.removeItem('user-role');

          // Redirect to the homepage
          window.location.replace('/');
      } else {
          alert("Failed to log out. Please try again.");
      }
  } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred. Please try again.");
  }
};



  return (
    <div className="header">
      <div className="header-offers">
          <img className="header-offers-site-icon" src={siteIconWhite} alt="" />
        <a className="header-offers-button" href="#productprice">
          <img src={OffersIcon} alt="" />
          <h2>پیشنهادات شگفت انگیز</h2>
        </a>
      </div>
      <div className="navbar">
        <a className="header-site-icon" href="#home"><img src={siteIcon} alt="" /></a>
        <div className="header-navigation">
          <a
            className={`nav-button nav-button-products ${selectedButton === 'products' ? 'redGrad nav-button' : 'nav-button'}`}
            onClick={() => handleButtonClick('products')}
            href="#products"
          >
            <img src={productIcon} alt="" /><p>محصولات</p>
          </a>
          <a
            className={`nav-button ${selectedButton === 'productsprice' ? 'redGrad nav-button' : 'nav-button'}`}
            onClick={() => handleButtonClick('productsprice')}
            href="#productprice"
          >
            <img src={PriceIcon} alt="" /><p>قیمت محصولات</p>
          </a>
          <a
            className={`nav-button ${selectedButton === 'schedule' ? 'redGrad nav-button' : 'nav-button'}`}
            onClick={() => handleButtonClick('schedule')}
            href="#schedule"
          >
            <img src={scheduleIcon} alt="" /><p>برنامه زمانی</p>
          </a>
          <a
            className={`nav-button nav-button-ads ${selectedButton === 'ads' ? 'redGrad nav-button' : 'nav-button'}`}
            onClick={() => handleButtonClick('ads')}
            href="#ads"
          >
            <img src={adsIcon} alt="" /><p>آگهی ها</p>
          </a>
          <a
            className={`nav-button ${selectedButton === 'adadd' ? 'redGrad nav-button' : 'nav-button'}`}
            onClick={() => handleButtonClick('adadd')}
            href="#adadd"
          >
            <img src={NavNewAd} alt="" /><p>ایجاد آگهی</p>
          </a>
          <a
            className={`nav-button nav-button-about ${selectedButton === 'about' ? 'redGrad nav-button' : 'nav-button'}`}
            onClick={() => handleButtonClick('about')}
            href="#about"
          >
            <img src={aboutUsIcon} alt="" /><p>درباره ما</p>
          </a>
          <div className="nav-button" onClick={onToggleCartModal}>
            <img src={CartIcon} alt="" />
            <p>سبد خرید ({getTotalCartItems()})</p>
          </div>

          <div className="nav-button" onClick={localStorage.getItem('user-name')?onToggleProfileModal:onToggleSignInModal}>
            <img src={UserIcon} alt="" />
            {localStorage.getItem('user-name')
                ?<div className="username-logout">
                  <p>{localStorage.getItem('user-name')}</p>
                  <img src={logOutIcon} alt='logout' onClick={logOut}/></div>
                :<p>ورود/ثبتنام</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavbar;
