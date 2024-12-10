import React, { useState } from 'react'
import './Schedule.css'

import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const Schedule = () => {

  return (
    <div className="schedule-container" id="schedule">
            <div className="schedule-header"><h1>در این قسمت میتوانید زمانی را برای کشتار دام خود رزرو کنید:</h1></div>
            <div className="schedule-body">
                <div className="inputs">
                    <p>نام و نام خانوادگی: </p>
                    <input type="text" />
                    <p>شماره تلفن</p>
                    <input type="text" />
                    <p>توضیحات: </p>
                    <input type="text"/>
                    <div className='button-datepicker-coontainer'>
                      <p>تاریخ: </p>
                      <DatePicker className="red" calendar={persian} locale={persian_fa} calendarPosition="bottom-right" />
                      <button className='reserve-button'>رزور</button>
                    </div>
                </div>
                <div className="calender">
                    <Calendar className="red" calendar={persian} locale={persian_fa}/>
                </div>
                
            </div>
        
    </div>
  )
}

export default Schedule