import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import PlaceHolder from '../../Assets/Placeholder.png'
import './Ads.css';
import { ImagesUrl } from '../../Constants/userConstants';

const Ads = () => {
  
  // Get all Ads from context
  const { AllAds } = useContext(ShopContext);

  // Modal states
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null); // State for the selected ad

  const openModal = (ad) => {
    setSelectedAd(ad); // Set the selected ad
    setModalDisplay(true); // Show the modal
  };

  const closeModal = () => {
    setModalDisplay(false);
    setSelectedAd(null); // Clear selected ad on close
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "myModal") {
      closeModal();
    }
  };


  return (
    <div className="ads-container">      
      <h1 className='ads-title' id="ads">آگهی های اخیر:</h1>
      <div className="adslist">
        {AllAds.map((item, i) => (
          <div className="adsitem" key={i} onClick={() => openModal(item)}>
            <img src={ImagesUrl+item.image || PlaceHolder} alt="" className="adpic" />
            <div className="adsdetails">
              <div className="ads-card-header">
                <h4>{item.description.substring(0, 20)}</h4>
              </div>
              <div className="ads-card-body">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Modal Code */}
        {selectedAd && (
          <div
            id="myModal"
            className="ads-modal"
            style={{ display: modalDisplay ? 'block' : 'none' }}
            onClick={handleOutsideClick}
          >
            <div className="ads-modal-overlay">
              <div className="ads-modal-content">
                <div className="ads-modal-item-image-container">
                  <img
                    src={ImagesUrl+selectedAd.image || PlaceHolder}
                    alt={selectedAd.title}
                    className="adpic"
                  />
                </div>
                <div className="ads-modal-item-detail-container">
                  <span className="modal-close-btn" onClick={closeModal}>
                    &times;
                  </span>
                  <div className="flxrow">
                    <h3>نام آگهی دهنده: </h3>
                    <p>{selectedAd.advertiserName || 'نامشخص'}</p>
                  </div>
                  <div className="flxcln">
                    <h3>توضیحات تکمیلی آگهی: </h3>
                    <p>{selectedAd.description || 'بدون توضیحات'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ads;
