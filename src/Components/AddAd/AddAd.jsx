import React from 'react'
import './AddAd.css'

const AddAd = () => {
  return (
        <div className="add-ad-container" id="adadd">
            <div className="add-ad">
                <div className="addadinput-container">
                    <h1>ایجاد یک آگهی جدید</h1>
                    <div className="adinputrow">
                        <input type="text" placeholder='نام: '/>
                        <input type="text" placeholder='شماره تلفن: '/>
                        <input type="text" placeholder='ایمیل: '/>
                    </div>
                    <div className="adinputrow">                    
                        <input className='long-input' type="text" placeholder='آدرس: '/>
                    </div>
                    <div className="adinputrow">
                        <input className='long-input' type="text" placeholder='توضیحات: '/>
                    </div>
                    <div className="adinputrow">
                        <button className="">ثبت آگهی</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddAd