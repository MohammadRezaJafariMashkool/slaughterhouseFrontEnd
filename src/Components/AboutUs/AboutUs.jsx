import React, { useState } from 'react'
import './AboutUs.css'

import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import map from '../../Assets/map.jpg'

const AboutUs = () => {

  return (
    <div className="aboutus-container" id="about">
      <div className="aboutus-item-aboutus">
            <h1>درباره ما:</h1>
            <h3>کشتارگاه آریا پارت پروتئین(ترشی زی)  </h3>
            <p>ما با افتخار خدماتی با کیفیت و مطابق با اصول اسلامی در زمینهٔ ذبح اسلامی و حلال ارائه می‌دهیم. در کشتارگاه ما، تمامی فرآورده‌های گوشتی با رعایت اصول دینی و به روش‌های اسلامی ذبح می‌شوند تا مشتریان عزیز اطمینان حاصل کنند که محصولاتی که از ما تهیه می‌نمایند، به طور کامل حاکمیت ایمانی آنها را در نظر گرفته است.</p>
            <h3>استانداردهای بالا و گواهی‌های معتبر:</h3>
            <p>ما با افتخار اعلام می‌کنیم که کشتارگاه ما دارای گواهی استاندارد و سیب سلامت از سازمان‌های مربوطه جمهوری اسلامی ایران است. این گواهی‌ها تضمین کننده‌ی این است که تمامی فرآورده‌های گوشتی تحت نظر کنترل‌های دقیق و با رعایت استانداردهای بهداشتی و ایمنی ارائه می‌شوند.</p>
            <h3>تعهد به سلامت و کیفیت:</h3>
            <p> در وبسایت ما، به تعهد به سلامتی و کیفیت بالای محصولات ارائه شده می‌پردازیم. این تعهد به همراه با تضمین حلال بودن ذبح اسلامی، به مشتریان اطمینان می‌دهد که در هر مرحله از تولید و فرآوری، اصول دینی و بهداشتی رعایت شده است.</p>
              
      </div>
      <div className="aboutus-item-contact">
            <h1>اطلاعات تماس:</h1>
            <div className="aboutus-item-contact-rows-container"><h3>شماره های تماس: </h3><p className='ltr'>(+98) 21 33448891 - 99</p></div>
            <div className="aboutus-item-contact-rows-container"><h3>ایمیل: </h3><p className='ltr'>torshizimeat@gmail.com</p></div>
            <div className="aboutus-item-contact-rows-container"><h3>آدرس: </h3><p>بلوارابوذر پل پنجم جنب بانک ملت</p></div>

      </div>
      <div className="aboutus-item-map-container">
            <h1>ما رو اینجا میتونید پیدا کنید: </h1>
            <a href="https://maps.app.goo.gl/jFziZrQh7tX6k4hT7" target='_blank' rel="noreferrer"><img src={map} alt="map"/></a>
      </div>
    </div>
  )
}

export default AboutUs