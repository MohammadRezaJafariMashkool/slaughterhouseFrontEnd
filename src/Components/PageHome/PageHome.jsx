import React, { useState } from 'react'
import './PageHome.css'
import AddAd from'../AddAd/AddAd'
import Banner from'../Banner/Banner'
import Ads from '../Ads/Ads'
import Schedule from '../Schedule/Schedule'
import Products from '../Products/Products'
import AboutUs from '../AboutUs/AboutUs'
import ShopContextProvider from '../../Context/ShopContext';

const PageHome = ({onToggleCartModal, onToggleSignInModal}) => {

  return (
    <div className='pagehome flxcln'>
      <Banner/>
      <Products onToggleCartModal={onToggleCartModal}/>
      <Schedule onToggleSignInModal={onToggleSignInModal}/>
      <Ads />
      <AddAd onToggleSignInModal={onToggleSignInModal}/>
      <AboutUs/>      
    </div>
  )
}

export default PageHome