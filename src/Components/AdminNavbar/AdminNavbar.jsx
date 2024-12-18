import React from 'react'
import './AdminNavbar.css'
import nav_profile  from '../../Assets/nav-profile.jpg'
import add_product_icon from '../../Assets/Product_Cart.svg'
import list_product_icon from '../../Assets/Product_list_icon.svg'

const Navbar = ({setBodyState }) => {

    const handleStateChange = (newState) => {
      setBodyState(newState); // Update the state from the parent
    };
  return (
    <div className='adminnavbar-container'>
      <div style={{color: 'inherit', textDecoration: 'none'}} className="adminnavbar-user-profile-container">
            <img src={nav_profile} alt="" className="nav-profile" />
            {localStorage.getItem('user-name')
            ?<p>{localStorage.getItem('user-name')}</p>
            :<p>نام کاربر</p>}
      </div>
      <div className="sidebar">
          <div style={{textDecoration:"none", curson: "pointer"}} onClick={() => handleStateChange("products")}>
              <div className="sidebar-item">
                  <img src={list_product_icon} alt="" />
                  <p>لیست محصولات</p>
              </div>
          </div>
          <div style={{textDecoration:"none", curson: "pointer"}} onClick={() => handleStateChange("orders")}>
              <div className="sidebar-item">
                  <img src={add_product_icon} alt="" />
                  <p>لیست سفارشات</p>
              </div>
          </div>
          <div style={{textDecoration:"none", curson: "pointer"}} onClick={() => handleStateChange("users")}>
              <div className="sidebar-item">
                  <img src={list_product_icon} alt="" />
                  <p>لیست کاربران</p>
              </div>
          </div>
          <div style={{textDecoration:"none", curson: "pointer"}} onClick={() => handleStateChange("ads")}>
              <div className="sidebar-item">
                  <img src={list_product_icon} alt="" />
                  <p>لیست آگهی ها</p>
              </div>
          </div>
      </div>
    </div>
  )
}
export default Navbar