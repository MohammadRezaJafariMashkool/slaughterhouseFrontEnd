import React, { useContext, useEffect, useState } from 'react'
import './AdminListAds.css'
import {BackendUrl} from '../../Constants/userConstants';
import { ShopContext } from '../../Context/ShopContext';

const ListAds = () => {
  
const {AllAds, setAllAds} =  useContext(ShopContext);
   
// Update the ad
  const deleteAd = async (_id)=>{

    try {
    if (localStorage.getItem('user-role')!=='admin') {alert('شما ادمین نیستید.');return;}
      const updatedAds = AllAds.filter((ad) => ad._id !== _id); // Removes the found ad
      setAllAds(updatedAds);
      
      const response = await fetch(BackendUrl+'/admin/ad/'+_id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',},
        credentials: 'include', 
      });

      const responseData = await response.json();
      if (responseData.success) {
        alert('آگهی با موفقیت ,حذف شد!');
      } else {
        alert('خطایی رخ داده است: ' + responseData.message);
      }
    } catch (error) {
      alert('خطایی رخ داده است.');
    }
  }




  return (
    <div className="admin-list-ads-container">
      <h1>آکهی ها:</h1>
      <div className="admin-list-ads-list-body">
            <div className="admin-list-ads-table-header">
              <p>شماره</p>
              <p>تاریخ</p>
              <p>کاربر</p>
              <p>توضیحات</p>
              <p>حذف</p>
            </div> 
            <div className="ads-list-container">        
            {AllAds.slice().map((ad) => {
                    return <div className="adslist-item-row">
                              <p className="adslist-item">{ad._id.slice(-7)}</p>
                              <p className="adslist-item">{ad.createdAt.slice(0,10)}</p>
                              <p className="adslist-item">{ad.user.slice(-7)}</p>
                              <p className="adslist-item">{ad.description}</p>
                              <div className="btn-delete-ad" onClick={()=>{deleteAd(ad._id)}}><p>حذف</p></div>
                            </div>
            })}
            </div>  
          </div>
    </div>
  )
}

export default ListAds