import React, { useState } from 'react'
import './Schedule.css'

import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { months } from 'moment-jalaali'
import { BackendUrl } from '../../Constants/userConstants'

const Schedule = ({onToggleSignInModal}) => {
  const [description, setDescription] = useState('');
  const [notstringDate, setdate] = useState('');
  const [stringDate, setStringDate] = useState('');
  const authToken = localStorage.getItem('auth-token'); // Retrieve auth token
  

  const addNewSchedule = async () => {
    if (!authToken) {
      alert('شما باید وارد حساب کاربری خود شوید.');
      onToggleSignInModal();
      return;
    }
  
    let date = stringDate;
  
    if (description === '' || date === '') {
      alert('لطفاً توضیحات دقیق و تاریخ را وارد کنید.');
      return;
    }
  
    try {
      const scheduleData = {
        description,
        date,
      };
  
      console.log("Payload being sent:", scheduleData); // Debugging payload
  
      const response = await fetch(`${BackendUrl}/schedule/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authToken,
        },
        body: JSON.stringify(scheduleData),
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        alert('رزرو با موفقیت ثبت شد!');
        setDescription('');
        setdate(''); // Clear the selected date
      } else {
        alert('خطایی رخ داده است: ' + responseData.message);
        console.error('Error response from server:', responseData); // Debugging server response
      }
    } catch (error) {
      console.error('Error submitting schedule:', error);
      alert('خطایی در ارسال آگهی رخ داده است.');
    }
  };
  
  
  return (
    <div className="schedule-container" id="schedule">
            <div className="schedule-header"><h1>در این قسمت میتوانید زمانی را برای کشتار دام خود رزرو کنید:</h1></div>
            <div className="schedule-body">
                <div className="inputs">
                    <h3 className="vacation-list-title">رزرو وقت:</h3>
                    <p>نام و نام خانوادگی: </p>
                    <input type="text" value={localStorage.getItem('user-name')}/>
                    <p>شماره تلفن</p>
                    <input type="text" value={localStorage.getItem('user-tel')}/>
                    <p>توضیحات: </p>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    <div className='button-datepicker-coontainer'>
                      <p>تاریخ: </p>
                      <DatePicker
                        className="red"
                        value={notstringDate}
                        onChange={(value) => {setdate((value)); setStringDate((value.toDate().toString()));}}  // Adjusted onChange handler
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                      />

                      <button onClick={addNewSchedule} className='reserve-button'>رزور</button>
                    </div>
                </div>
                <div className="vacation-list-container">
                  <h3 className="vacation-list-title">لیست تعطیلات و روز های کاملا رزرو شده 30 روز آینده:</h3>
                </div>
                <div className="calender">
                    <Calendar className="red" calendar={persian} locale={persian_fa}/>
                </div>
                
            </div>
        
    </div>
  )
}

export default Schedule