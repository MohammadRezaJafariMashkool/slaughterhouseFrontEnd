import React from 'react'
import { Carousel } from 'react-carousel-minimal';
import './Banner.css'
import carosel_image1 from '../../Assets/CslBg1.jpg'
import carosel_image2 from '../../Assets/CslBg2.jpg'
import carosel_image3 from '../../Assets/CslBg3.jpg'
import carosel_image4 from '../../Assets/CslBg4.jpg'

import IsoIcon from '../../Assets/Icons/CirIsoGray.png'
import EacIcon from '../../Assets/Icons/CirEACGray.png'
import HalalIcon from '../../Assets/Icons/CirHalalpngGray.png' 
import SibIcon from '../../Assets/Icons/SibIconGray.png'  
import DeliveryIcon from '../../Assets/Icons/DeliveryIcon.png'  

const Banner = () => {
  const data = [
    {
      image: carosel_image1
    },
    {
      image: carosel_image2
    },
    {
      image: carosel_image3
    },
    {
      image: carosel_image4
    }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div className="banner"  id="home">     
        <Carousel
            data={data}
            time={2000}
            width="100%"
            height="600px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            style={{
              direction: "ltr",
              textAlign: "center",
              maxWidth: "100%",
              maxHeight: "700px",
            }}
          />
      <div className="futures">
        <div className="futures-item"><img src={HalalIcon} alt="" className="future-icon" /><h1>ذبح اسلامی</h1><p>ذبح اسلامی (حلال) به فرآیند ذبح حیوانات بر اساس اصول و قوانین شرعی اسلام اشاره دارد. این روش نه تنها به رعایت حقوق حیوانات اهمیت می‌دهد، بلکه تضمین می‌کند که گوشت تولید شده از لحاظ بهداشتی و اخلاقی نیز مناسب مصرف باشد. در این فرآیند، نام خدا بر روی حیوان خوانده می‌شود و باید با دقت و احترام انجام گیرد.</p></div>
        <div className="futures-item"><img src={IsoIcon} alt="" className="future-icon" /><h1>گواهینامه ISO</h1><p>گواهینامه ISO نشان‌دهنده رعایت استانداردهای بین‌المللی در زمینه مدیریت کیفیت، ایمنی و کارایی محصولات و خدمات است. این گواهینامه به شرکت‌ها کمک می‌کند تا فرآیندهای خود را بهبود بخشند و اعتماد مشتریان را جلب کنند. داشتن گواهینامه ISO نه تنها اعتبار برند را افزایش می‌دهد، بلکه به افزایش رضایت مشتریان نیز منجر می‌شود.</p></div>
        <div className="futures-item"><img src={EacIcon} alt="" className="future-icon" /><h1>گواهینامه EAC اروپا</h1><p>گواهینامه EAC (European Conformity) تأیید می‌کند که محصولات مطابق با استانداردهای ایمنی و کیفیت بازارهای اروپایی هستند. این گواهینامه برای صادرات کالا به کشورهای عضو اتحادیه اقتصادی اوراسیا الزامی است و به مصرف‌کنندگان اطمینان می‌دهد که محصولات از نظر کیفیت و ایمنی مورد تأیید قرار گرفته‌اند.</p></div>
        <div className="futures-item"><img src={SibIcon} alt="" className="future-icon" /><h1>سیب سلامت </h1><p>سیب سلامت یک نشان ویژه است که به محصولات غذایی با کیفیت بالا و ایمن تعلق می‌گیرد. این نشان به مصرف‌کنندگان اطمینان می‌دهد که محصول تحت نظارت‌های دقیق بهداشتی و کیفی قرار گرفته و از مواد اولیه سالم تهیه شده است. هدف از اعطای سیب سلامت، ارتقاء آگاهی عمومی درباره انتخاب‌های غذایی سالم و ایمن است.</p></div>
        <div className="futures-item"><img src={DeliveryIcon} alt="" className="future-icon" /><h1>ارسال سریع </h1><p>ارسال سریع یکی از خدمات کلیدی ماست که به مشتریان این امکان را می‌دهد تا محصولات خود را در کوتاه‌ترین زمان ممکن دریافت کنند. با استفاده از سیستم‌های پیشرفته لجستیکی و شبکه توزیع کارآمد، ما تضمین می‌کنیم که سفارشات به موقع و با کیفیت عالی به دست مشتریان برسد. این خدمت نه تنها راحتی را برای مشتریان فراهم می‌آورد، بلکه تجربه خرید آنلاین را نیز لذت‌بخش‌تر می‌کند.</p></div>
      </div>
    </div>
  )
}

export default Banner