import React, { useEffect, useState } from 'react'
import './AdminListOrders.css'
import {BackendUrl} from '../../Constants/userConstants';
import moment from 'moment-jalaali';

const ListProduct = ({updateState}) => {

  
  const [ordersList, setOrdersList] = useState([])
  
  




  //Handle the persian name of element
  const orderStatus = {
    "Processing": "درحال انجام",
    "Canceled": "لغو شده",
    "Delivered": "تحویل داده شده"
  };  

  //Handle the color of select element
  const style = (orderStatus)=>{
    if(orderStatus === 'Delivered'){return {fontFamily: 'Light', background: '#80ed99'}}
    else if(orderStatus === 'Processing'){return {fontFamily: 'Light', background: '#ffd166'}}
    else{return {fontFamily: 'Light', background: '#ffa5ab'}}
    }  

// Update the order's status and Notes
const saveChanges = async (id)=>{
  const localOrderStatus = document.getElementById(id+"select").value;
  const localOrderNotes = document.getElementById(id+"notes").value;  
  await fetch(BackendUrl+'/admin/order/'+id,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
    },
    body: JSON.stringify({ orderStatus: localOrderStatus, orderNotes: localOrderNotes})
  })
  .then((resp) => resp.json()).then((data) => {
    if(data.success){
      alert("اطلاعات سفارش بروز شد!")
    }
  else{
    console.log(data)
    console.log(JSON.stringify({ orderStatus: localOrderStatus, orderNotes: localOrderNotes}))
    alert("خطای سرور!!")
  }
  });
}


  return (
    <div className="orders-list">
      <h1>سفارش ها:</h1>
      <div className="user-orders-list-body">
            <div className="user-orders-list-table-header">
              <p>شماره سفارش</p>
              <p>تاریخ سفارش</p>
              <p>مبلغ سفارش</p>
              <p>اطلاعات کاربر</p>
              <p>وضعیت سفارش</p>
              <p>توضیحات سفارش</p>
            </div> 
            <div className="orders-list-container">        
            {ordersList.map((e) => {
                    return <div className="user-orders-list-table-item">
                        </div>
            })}
            </div>  
          </div>
    </div>
  )
}

export default ListProduct