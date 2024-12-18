import React, { useEffect, useState } from 'react'
import './AdminListAds.css'
import {BackendUrl} from '../../Constants/userConstants';
import moment from 'moment-jalaali';

const ListProduct = ({updateState}) => {

  // kicks unadmin user out ;)
  updateState('admin')

  const [ordersList, setOrdersList] = useState([])
  
// Get All Orders 
useEffect(() => {
  const getAllOrders = async()=>{
    let responseData;
      await fetch(BackendUrl+'/admin/orders',{
        method:'GET',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
        }
      }).then((response)=> response.json()).then((data)=>responseData = data)
  
      if(!responseData.success){    
        alert("خطا!!");     
      }
      else{
        setOrdersList(responseData.orders)
      }
    };
    // Call the function when the component mounts
    getAllOrders();
  }, []);

  // Shows order's details
  const orderDetails = async(orderItems)=>{
    let details = ""; // Initialize details as an empty string

    orderItems.forEach(item => {
        details += "نام محصول: " + item.name + " | قیمت: " + item.price + " | تعداد: " + item.quantity + "\n";
    });

    alert("جزئیات سفارش: \n"+details);
  }

  // Shows user's details
  const userDetails = async(user)=>{
    let userDetailsInAString = "جزئیات کاربر: \n"+JSON.stringify(user);

    userDetailsInAString = userDetailsInAString.replace('{"_id":"', "\nآیدی: "); 
    userDetailsInAString = userDetailsInAString.replace('","name":"', "\nنام: "); 
    userDetailsInAString = userDetailsInAString.replace('","email":"', "\nایمیل: "); 
    userDetailsInAString = userDetailsInAString.replace('","tel":"', "\nتلفن: "); 
    userDetailsInAString = userDetailsInAString.replace('","address":"', "\nآدرس: "); 
    userDetailsInAString = userDetailsInAString.replace('"}', ""); 

    alert(userDetailsInAString);
  }
  // Shows payment details
  const paymentDetails = async(paymentInfo)=>{
    let paymentDetailsInAString = "جزئیات سفارش: \n"+JSON.stringify(paymentInfo);

    paymentDetailsInAString = paymentDetailsInAString.replace('{"id":"', "آیدی: "); 
    paymentDetailsInAString = paymentDetailsInAString.replace('","status":"succeeded"}', "\n وضعیت این پرداخت: موفق"); 

    alert(paymentDetailsInAString);
  }

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
                          <p onClick={()=>{orderDetails(e.orderItems)}}>{e._id}</p>
                          <p>{moment(e.createdAt).format('jYYYY/jMM/0')}</p>
                          <p onClick={()=>{paymentDetails(e.paymentInfo)}}>{e.totalPrice.toLocaleString()+" تومان"}</p>
                          <p onClick={()=>{userDetails(e.user)}}>{e.user.name}</p>
                          <div className="div-order-status">
                              <select style={style(e.orderStatus)} name="status" id={e._id+"select"} defaultValue={e.orderStatus}>
                                <option style={{background: '#80ed99'}} value="Delivered">تحویل شد</option>
                                <option style={{background: '#ffd166'}} value="Processing">درحال انجام</option>
                                <option style={{background: '#ffa5ab'}} value="Canceled">کنسل شده</option>
                              </select>
                          </div>
                          <div className="div-order-notes">
                            <input type="text" id={e._id+"notes"} value={e.orderNotes}/>
                            <button onClick={()=>{saveChanges(e._id)}}>ذخیره</button>
                          </div>
                        </div>
            })}
            </div>  
          </div>
    </div>
  )
}

export default ListProduct