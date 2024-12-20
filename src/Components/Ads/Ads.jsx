import React, { useState } from 'react'
import './Ads.css'
import adImage from '../../Assets/ad_template.jpg'

const Ads = () => {

    // Modal codes
    const [modalDisplay, setModalDisplay] = useState(false);

    const openModal = () => {
        setModalDisplay(true);
    };

    const closeModal = () => {
        setModalDisplay(false);
    };

    const handleOutsideClick = (event) => {
        if (event.target.id === "myModal") {
        closeModal();
        }
    };

    return (
        <div className="adslist">
          {Array.from({ length: 15 }, (_, i) => (
            <div className="additem" key={i} onClick={openModal}>
              <img src={adImage} alt="" className="adpic" />
              <div className="addetails">
                <div className='add-card-header'><h4>کشتار 1500 رأس گوسفند</h4></div>
                <div className="add-card-body">
                  <p>
                    تمامی دام ها درروستای فلان می باشند و برای بازدید تماس بگیرید تمامی دام ها 
                    درروستای فلان می باشند و برای بازدید تماس بگیرید تمامی دام ها درروستای فلان می باشند 
                    و برای بازدید تماس بگیرید
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div id="myModal" className="modal" style={{ display: modalDisplay ? 'block' : 'none' }}  onClick={handleOutsideClick}>
            <div class="modal-content">
                {/* <div className="modal-item-closebutton-container">
                </div> */}
                <div className="modal-item-detail-container">
                    <span class="close" onClick={closeModal}>&times;</span>
                    <div className='flxrow'><h3>نام آگهی دهنده: </h3><p>محسن تنابنده</p></div>
                    <div className='flxcln'><h3>توضیحات تکمیلی آگهی: </h3><p>تمامی دام ها درروستای فلان می باشند و برای بازدید تماس بگیرید تمامی دام ها درروستای فلان می باشند و برای بازدید تماس بگیرید تمامی دام ها درروستای فلان می باشند و برای بازدید تماس بگیرید</p></div>
                </div>
                <div className="modal-item-image-container">
                    <img src={adImage} alt="" className="adpic" />
                </div>
            </div>
        </div>
        </div>
      )        
}

export default Ads