import React from 'react'
import { Carousel } from 'react-carousel-minimal';
import './Banner.css'
import carosel_image1 from '../Assets/CslBg1.jpg'
import carosel_image2 from '../Assets/CslBg2.jpg'
import carosel_image3 from '../Assets/CslBg3.jpg'
import carosel_image4 from '../Assets/CslBg4.jpg'

import IsoIcon from '../Assets/Icons/CirIso.png'
import EacIcon from '../Assets/Icons/CirEAC.png'
import HalalIcon from '../Assets/Icons/CirHalalpng.png' 
import SibIcon from '../Assets/Icons/SibIcon.png'  

const Banner = () => {
  const data = [
    {
      image: carosel_image1
    },
    {
      image: carosel_image2
    },
    {
      image: carosel_image3
    },
    {
      image: carosel_image4
    }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div className="banner"  id="home">     
        <Carousel
            data={data}
            time={2000}
            width="100%"
            height="600px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            style={{
              direction: "ltr",
              textAlign: "center",
              maxWidth: "100%",
              maxHeight: "700px",
            }}
          />
      <div className="futures">
        <div className="futures-item"><img src={HalalIcon} alt="" className="future-icon" /><h1>ذبح اسلامی</h1></div>
        <div className="futures-item"><img src={IsoIcon} alt="" className="future-icon" /><h2>گواهینامه ISO</h2></div>
        <div className="futures-item"><img src={EacIcon} alt="" className="future-icon" /><h2>گواهینامه EAC اروپا</h2></div>
        <div className="futures-item"><img src={SibIcon} alt="" className="future-icon" /><h2>سیب سلامت </h2></div>
      </div>
    </div>
  )
}

export default Banner