import React, { useContext} from 'react'
import './AdminListUsers.css'
import { ShopContext } from '../../Context/ShopContext';

const AdminListUsers = ({}) => {
  const {usersList, setUsersList} =  useContext(ShopContext);

  return (
    <div className="user-container">
      <h1>کاربران:</h1>
      <div className="user-list-body">
            <div className="user-list-table-header">
              <p>کد</p>
              <p>نام</p>
              <p>تلفن</p>
              <p>شهر</p>
              <p>ایمیل</p>
              <p>آدرس</p>
            </div> 
            <div className="user-list-container">        
            {usersList.slice().reverse().map((user) => {
                    return <div className="user-list-table-item" key={user._id}>
                            <div className="user-item-row">
                              <p className="userslist-item">{user._id.slice(-7)}</p>
                              <p className="userslist-item">{user.name}</p>
                              <p className="userslist-item">{user.tel}</p>
                              <p className="userslist-item">{user.city}</p>
                              <p className="userslist-item">{user.email}</p>
                              <p className="userslist-item">{user.address}</p>
                            </div>
                        </div>
            })}
            </div>  
          </div>
    </div>
  )
}

export default AdminListUsers