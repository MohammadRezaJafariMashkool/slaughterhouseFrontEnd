import React, { useState } from 'react';
import './AddAd.css';
import { BackendUrl } from '../../Constants/userConstants';

const AddAd = ({ onToggleSignInModal }) => {
  const userName = localStorage.getItem('user-name'); // Retrieve auth token
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const addNewAd = async () => {
    if (!userName) {
      //alert('شما باید وارد حساب کاربری خود شوید.');
      alert(userName);
      return;
    }

    if (!description || images.length === 0) {
      alert('لطفاً توضیحات و حداقل یک تصویر را وارد کنید.');
      return;
    }

    try {
      // Step 1: Upload images
      const formData = new FormData();
      formData.append('type', 'ad'); // Add the type
      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i]); // Add image files
      }

      const uploadResponse = await fetch(`${BackendUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        alert('خطا در آپلود تصاویر: ' + uploadData.message);
        return;
      }

      // Convert image URLs array to a single string
      const uploadedImageUrls = uploadData.image_urls.join(','); // Convert array to a comma-separated string

      // Step 2: Submit the ad with uploaded image URLs
      const adData = {
        description,
        image: uploadedImageUrls, // Send the URLs as a string
      };

      const response = await fetch(`${BackendUrl}/ad/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are included in the request/response
        body: JSON.stringify(adData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert('آگهی با موفقیت ثبت شد!');
        setDescription('');
        setImages([]); // Clear the selected images
      } else {
        alert('خطایی رخ داده است: ' + responseData.message);
      }
    } catch (error) {
      console.error('Error submitting ad:', error);
      alert('خطایی در ارسال آگهی رخ داده است.');
    }
  };
  return (
    <div className="add-ad-container" id="adadd">
      <div className="add-ad">
        <div className="addadinput-container">
          <h1>ایجاد یک آگهی جدید</h1>
          <div className="adinputrow">
          <p>نام و نام خانوادگی: </p>
          <input type="text" value={localStorage.getItem('user-name')}/>
          <p>شماره تلفن: </p>
          <input type="text" value={localStorage.getItem('user-tel')}/>
            <textarea
              className="long-input"
              type="text"
              placeholder="لطفا توضیحات کامل آگهی را وارد کنید: "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="file-upload" className="file-upload-label">
                انتخاب تصویر
            </label>
            <input id="file-upload" type="file" onChange={(e) => setImages(Array.from(e.target.files))} className="file-upload-input"/>
            <button className="adinputbtn" onClick={addNewAd}>
            ثبت آگهی
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAd;
