import React, { useContext, useEffect, useState } from 'react'
import './AdminListOrders.css'
import {BackendUrl} from '../../Constants/userConstants';
import moment from 'moment-jalaali';
import { ShopContext } from '../../Context/ShopContext';

const ListProduct = () => {
  const [visibleDetails, setVisibleDetails] = useState(null); // State to track which order's details are visible

  const showDetails = (orderId) => {
    if (visibleDetails === orderId) {setVisibleDetails(null);} else {setVisibleDetails(orderId);}
  };
  
  const {ordersList, setOrdersList} =  useContext(ShopContext);

  //Handle the persian name of element
  const orderStatus = {
    "Pending": "درحال انجام",
    "Canceled": "لغو شده",
    "Delivered": "تحویل داده شده",
    "Disabled": "حذف شده"
  };  
  
  const handleOrderChange = (id, field, value) => { 
      const updatedOrder = ordersList.map((order) =>
        order._id === id
          ? { ...order, [field]: value }
          : order
      );
      setOrdersList(updatedOrder);
  };
 
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Canceled":
        return "red";
      case "Delivered":
        return "green";
      case "Disabled":
        return "gray";
      default:
        return "black";
    }
  };

// Update the order
  const sendChangesToServer = async (_id)=>{

    try {
    const foundOrder = ordersList.find((order) => order._id === _id);
    if (localStorage.getItem('user-role')!=='admin') {alert('شما ادمین نیستید.');return;}

      const editedOrderData = {orderStatus:foundOrder.orderStatus,};

      const response = await fetch(BackendUrl+'/admin/order/'+_id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        credentials: 'include', // Ensure cookies are included in the request/response
        body: JSON.stringify(editedOrderData),
      });

      const responseData = await response.json();
      if (responseData.success) {
        alert('سفارش با موفقیت ,ویرایش شد!');
      } else {
        alert('خطایی رخ داده است: ' + responseData.message);
      }
    } catch (error) {
      alert('خطایی رخ داده است.');
    }
  }




  return (
    <div className="orders-list">
      <h1>سفارش ها:</h1>
      <div className="user-orders-list-body">
            <div className="user-orders-list-table-header">
              <p>شماره</p>
              <p>تاریخ</p>
              <p>مبلغ</p>
              <p>کاربر</p>
              <p>وضعیت</p>
              <p></p>
            </div> 
            <div className="orders-list-container">        
            {ordersList.slice().reverse().map((order) => {
                    return <div className="user-orders-list-table-item" key={order._id}>
                            <div className="order-item-row">
                              <p className="orderslist-item">{order._id.slice(-7)}</p>
                              <p className="orderslist-item">{order.createdAt.slice(0,10)}</p>
                              <p className="orderslist-item">{order.itemsPrice.toLocaleString()} تومان</p>
                              <p className="orderslist-item">{order.user.slice(-7)}</p>
                              <select id="order-status" value={order.orderStatus} 
                              style={{backgroundColor: getStatusColor(order.orderStatus),color: "white", borderRadius: "5px", border: "none", }}
                              onChange={(e) => handleOrderChange(order._id, 'orderStatus', e.target.value)}>
                                {Object.entries(orderStatus).map(([key, value]) => (
                                  <option key={key} value={key} style={{ color: "black" }}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                              <div className="btn-savechanges-orders" onClick={()=>{sendChangesToServer(order._id)}}><p>ذخیره</p></div>
                              <div className="btn-show-details-orders" onClick={() => showDetails(order._id)}><p>{visibleDetails === order._id ? 'مخفی کردن جزئیات' : 'نمایش جزئیات'}</p></div>
                            </div>
                            {visibleDetails === order._id && (
                              <div className="order-item-details">
                                <p>آدرس: {order.shippingInfo.address}</p>
                                <p>شهر: {order.shippingInfo.city}</p>
                                <p>تلفن: {order.shippingInfo.tel}</p>
                                <div className='products-list-in-order-details'>
                                {order.orderItems.map((product, index) => {
                                    return (
                                      <p key={index}>
                                        {index + 1 + '. ' + product.name + ': ' + product.quantity + ' کیلو' + ' ' + product.price + ' تومان'}
                                      </p>
                                    );
                                  })}
                                  </div>
                                
                              </div>
                              )}
                        </div>
            })}
            </div>  
          </div>
    </div>
  )
}

export default ListProduct