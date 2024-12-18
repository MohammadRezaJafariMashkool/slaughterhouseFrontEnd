import React from 'react'
import './AdminNavbar.css'
import nav_logo from '../../Assets/nav-logo.png'
import nav_profile  from '../../Assets/nav-profile.jpg'

import {Link} from 'react-router-dom'
import add_product_icon from '../../Assets/Product_Cart.svg'
import list_product_icon from '../../Assets/Product_list_icon.svg'

const Navbar = () => {
  return (
    <div>
      <Link style={{color: 'inherit', textDecoration: 'none'}} to='/' onClick={()=>{window.location('/');}} className="navbarad">
          <img src={nav_logo} alt="" className="navbarad-logo" />
          <div className="nav-user" style={{color: 'inherit', textDecoration: 'none'}}>
            <img src={nav_profile} alt="" className="nav-profile" />
            {localStorage.getItem('user-name')
            ?<p className="nav-user-name">{localStorage.getItem('user-name')}</p>
            :<p className="nav-user-name">نام کاربر</p>}
          </div>
      </Link>
      <div className="sidebar">
          <Link to={'adminaddproduct'} style={{textDecoration:"none", curson: "pointer"}}>
              <div className="sidebar-item">
                  <img src={add_product_icon} alt="" />
                  <p>اضافه کردن محصول</p>
              </div>
          </Link>
          <Link to={'adminlistproduct'} style={{textDecoration:"none", curson: "pointer"}}>
              <div className="sidebar-item">
                  <img src={list_product_icon} alt="" />
                  <p>لیست محصولات</p>
              </div>
          </Link>
          <Link to={'adminlistorders'} style={{textDecoration:"none", curson: "pointer"}}>
              <div className="sidebar-item">
                  <img src={list_product_icon} alt="" />
                  <p>لیست سفارش ها</p>
              </div>
          </Link>
      </div>
    </div>
  )
}
export default Navbar