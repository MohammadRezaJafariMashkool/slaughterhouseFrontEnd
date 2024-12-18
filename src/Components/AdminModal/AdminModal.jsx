import React, { useContext, useState } from 'react';
import './AdminModal.css';
import CloseBtnIcon from '../../Assets/cart_cross_icon.png';
import {ShopContext} from '../../Context/ShopContext';
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminListOrders from '../AdminListOrders/AdminListOrders'
import AdminListProduct from '../AdminListProduct/AdminListProduct'
import AdminListUsers from '../AdminListUsers/AdminListUsers'
import AdminListAds from '../AdminListAds/AdminListAds'

const AdminModal = () => {

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true); // Assuming it starts visible
  // Close the modal
  const closeModal = () => {setIsModalOpen(false);};

  const [bodyState, setBodyState] = useState("products")

  return (
    <div
      className="adminmodal"
      style={{ display: isModalOpen ? 'block' : 'none' }}
    >
      <div className="adminmodal-overlay" onClick={closeModal}></div>
      <div className="adminmodal-content">
        <h2>پنل مدیریت</h2>        
        <img src={CloseBtnIcon} alt='close button' className='adminmodal-close-btn' onClick={closeModal}></img>

        <AdminNavbar bodyState={bodyState} setBodyState={setBodyState}/>
        {/* Body Sections */}
        {bodyState === "products" && <AdminListProduct />}
        {bodyState === "orders" && <AdminListOrders />}
        {bodyState === "users" && <AdminListUsers />}
        {bodyState === "ads" && <AdminListAds />}
      </div>
    </div>
  );
};

export default AdminModal;
