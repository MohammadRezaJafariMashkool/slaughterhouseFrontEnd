import React from 'react'
import './PageHome.css'
import AddAd from'./AddAd'
import Banner from'./Banner'
import Ads from './Ads'
import Schedule from './Schedule'
import Products from './Products'
import AboutUs from './AboutUs'

const PageHome = () => {
  return (
    <div className='pagehome flxcln'>
      <Banner/>
      <Products/>
      <Schedule/>
      <h1 className='ads-title' id="ads">آگهی های اخیر:</h1>
      <Ads />
      <AddAd/>
      <AboutUs/>
    </div>
  )
}

export default PageHome