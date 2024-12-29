import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import PlaceHolder from '../../Assets/Placeholder.png'
import './Ads.css';
import { BackendUrl } from '../../Constants/userConstants';

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
    <div className="adslist">
      {AllAds.map((item, i) => (
        <div className="additem" key={i} onClick={() => openModal(item)}>
          <img src={BackendUrl+item.image || PlaceHolder} alt="" className="adpic" />
          <div className="addetails">
            <div className="add-card-header">
              <h4>{item.description.substring(0, 50)}</h4>
            </div>
            <div className="add-card-body">
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
                  src={BackendUrl+selectedAd.image || PlaceHolder}
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
  );
};

export default Ads;
