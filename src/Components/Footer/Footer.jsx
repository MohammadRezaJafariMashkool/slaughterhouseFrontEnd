import React from 'react'
import './Footer.css'
import IsoIcon from '../../Assets/Icons/CirIso.png'
import EacIcon from '../../Assets/Icons/CirHalalpng.png'
import HalalIcon from '../../Assets/Icons/CirEAC.png'
import SibIcon from '../../Assets/Icons/SibIcon.png'
import WtsIcon from '../../Assets/Icons/WtsIcon.png'
import InsIcon from '../../Assets/Icons/InsIcon.png'
import TelIcon from '../../Assets/Icons/TgmIcon.png'

const Footer = () => {
  return (
    <div className="footer brn">
        <p className='txtclrcrm'>Copy Right © 2029 MRJM LLC</p>
        <div className="icons-container">
            <img src={IsoIcon} alt="" className="footer-icon" />
            <img src={EacIcon} alt="" className="footer-icon" />
            <img src={HalalIcon} alt="" className="footer-icon" />
            <img src={SibIcon} alt="" className="footer-icon" />
            <img src={WtsIcon} alt="" className="footer-icon" />
            <img src={InsIcon} alt="" className="footer-icon" />
            <img src={TelIcon} alt="" className="footer-icon" />
        </div>
    </div>
  )
}

export default Footer