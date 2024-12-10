import React, { useState } from 'react';
import './Products.css';
import Beef_details_image from '../Assets/beef-cuts.jpg';

import cow_ran_goosale from '../Assets/Product/cow/cow_ran_goosale.jpg';
import cow_sardast_goosale from '../Assets/Product/cow/cow_sardast_goosale.jpg';
import cow_raste_goosale from '../Assets/Product/cow/cow_raste_goosale.jpg';
import cow_gardan_goosale from '../Assets/Product/cow/cow_gardan_goosale.jpg';
import cow_fileh_goosale from '../Assets/Product/cow/cow_fileh_goosale.jpg';
import cow_golvegah_goosale from '../Assets/Product/cow/cow_golvegah_goosale.jpg';
import cow_lashe_goosale from '../Assets/Product/cow/cow_lashe_goosale.jpg';

import sheep_ran_goosfand from '../Assets/Product/sheep/sheep_ran_goosfand.jpg';
import sheep_sardast_goosfand from '../Assets/Product/sheep/sheep_sardast_goosfand.jpg';
import sheep_raste_goosfand from '../Assets/Product/sheep/sheep_raste_goosfand.jpg';
import sheep_gardan_goosfand from '../Assets/Product/sheep/sheep_gardan_goosfand.jpg';
import sheep_fileh_goosfand from '../Assets/Product/sheep/sheep_fileh_goosfand.jpg';
import sheep_golvegah_goosfand from '../Assets/Product/sheep/sheep_golvegah_goosfand.jpg';
import sheep_raste_ba_ostokhan_goosfand from '../Assets/Product/sheep/sheep_raste_ba_ostokhan_goosfand.jpg';

const Product = () => {
  // States for product quantities
  const [quantities, setQuantities] = useState(
    Array(14).fill(0) // Default quantities for 14 products
  );

  // Handles input change
  const handleInputChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value ? parseInt(value) || 0 : 0; // Update quantity
    setQuantities(newQuantities);
  };

  // Handles add to cart
  const handleAddToCart = () => {
    const cartItems = quantities
      .map((quantity, index) => (quantity > 0 ? { productIndex: index, quantity } : null))
      .filter((item) => item !== null); // Filter out products with quantity 0

    console.log('Cart Items:', cartItems);
    alert(`Items added to cart: ${JSON.stringify(cartItems)}`);
  };

  return (
    <div className="products-container">
      <div className="products-header" id="products">
        <h1>لیست محصولات ما:</h1>
        <img src={Beef_details_image} alt="" className="beef-details" />
      </div>
      <div className="products-list-container" id="productprice">
        <div className="products-list-small-card">
          <div className="header-small-card-prices">
            <p>گوشت گوساله</p>
          </div>
          <div className="body-small-card-prices">
            <div className="prices-right">
              <div className="prices-item-right"><img src={cow_ran_goosale} alt="" /><p>ران گوساله</p></div>
              <div className="prices-item-right"><img src={cow_sardast_goosale} alt="" /><p>سردست گوساله</p></div>
              <div className="prices-item-right"><img src={cow_raste_goosale} alt="" /><p>راسته گوساله</p></div>
              <div className="prices-item-right"><img src={cow_gardan_goosale} alt="" /><p>گردن گوساله</p></div>
              <div className="prices-item-right"><img src={cow_fileh_goosale} alt="" /><p>فیله گوساله</p></div>
              <div className="prices-item-right"><img src={cow_golvegah_goosale} alt="" /><p>قلوه گاه گوساله</p></div>
              <div className="prices-item-right"><img src={cow_lashe_goosale} alt="" /><p>لاشه گوساله</p></div>
            </div>
            <div className="prices-middle">
              {Array(7).fill('1000000').map((price, idx) => (
                <div key={idx} className="prices-item-middle"><p>{price}</p><p>تومان</p></div>
              ))}
            </div>
            <div className="prices-left">
              {quantities.slice(0, 7).map((quantity, idx) => (
                <div key={idx} className="prices-item-left">
                  <input
                    className="product-amount-txb"
                    type="number"
                    value={quantity}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                  />
                  <p>کیلو</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="products-list-small-card">
          <div className="header-small-card-prices">
            <p>گوشت گوسفند</p>
          </div>
          <div className="body-small-card-prices">
            <div className="prices-right">
              <div className="prices-item-right"><img src={sheep_ran_goosfand} alt="" /><p>ران گوسفند</p></div>
              <div className="prices-item-right"><img src={sheep_sardast_goosfand} alt="" /><p>سردست گوسفند</p></div>
              <div className="prices-item-right"><img src={sheep_raste_goosfand} alt="" /><p>راسته گوسفند</p></div>
              <div className="prices-item-right"><img src={sheep_gardan_goosfand} alt="" /><p>گردن گوسفند</p></div>
              <div className="prices-item-right"><img src={sheep_fileh_goosfand} alt="" /><p>فیله گوسفند</p></div>
              <div className="prices-item-right"><img src={sheep_golvegah_goosfand} alt="" /><p>قلوه گاه گوسفند</p></div>
              <div className="prices-item-right"><img src={sheep_raste_ba_ostokhan_goosfand} alt="" /><p>لاشه گوسفند</p></div>
            </div>
            <div className="prices-middle">
              {Array(7).fill('1000000').map((price, idx) => (
                <div key={idx} className="prices-item-middle"><p>{price}</p><p>تومان</p></div>
              ))}
            </div>
            <div className="prices-left">
              {quantities.slice(7).map((quantity, idx) => (
                <div key={idx + 7} className="prices-item-left">
                  <input
                    className="product-amount-txb"
                    type="number"
                    value={quantity}
                    onChange={(e) => handleInputChange(idx + 7, e.target.value)}
                  />
                  <p>کیلو</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className="add-to-cart-butn" onClick={handleAddToCart}>اضافه به سبد</button>
    </div>
  );
};

export default Product;
