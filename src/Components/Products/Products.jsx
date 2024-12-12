import React, { useContext, useState } from 'react';
import {ShopContext} from '../../Context/ShopContext'
import './Products.css';
import Beef_details_image from '../../Assets/beef-cuts.jpg';

const Product = (props) => {

  // Get products from context
  const {AllProducts} = useContext(ShopContext);

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
        
        {/* Cow Products Table */}
        <div className="products-list-small-card">
          <div className="header-small-card-prices">
            <p>گوشت گوساله</p>
          </div>
            <div className="prices-table-body">
              {AllProducts.map((item, i)=>{
                if(item.category === "Cow"){
                  return <div  className="prices-item-container">
                            <div key={i} className="prices-item">
                              <img className="product-img" src={item.image} alt="" />
                              <p className="product-name">{item.name}</p>
                              <p className="product-price">{item.new_price}</p>
                              <p className="product-price-sign">تومان مقدار:</p>                          
                              <input className="product-amount-txb" type="number" defaultValue={0} onChange={(e) => handleInputChange(i, e.target.value)}/>
                              <p className="product-kilo">کیلو</p>
                            </div>
                        </div>
                }
                else{
                  return null
                }
              })}
            </div>
        </div>

        {/* Lamb Products Table */}
        <div className="products-list-small-card">
          <div className="header-small-card-prices">
            <p>گوشت گوسفند</p>
          </div>
          <div className="prices-table-body">
            {AllProducts.map((item, i)=>{
                  if(item.category === "Sheep"){
                    return <div  className="prices-item-container">
                              <div key={i} className="prices-item">
                                <img className="product-img" src={item.image} alt="" />
                                <p className="product-name">{item.name}</p>
                                <p className="product-price">{item.new_price}</p>
                                <p className="product-price-sign">تومان مقدار:</p>                          
                                <input className="product-amount-txb" type="number" defaultValue={0} onChange={(e) => handleInputChange(i, e.target.value)}/>
                                <p className="product-kilo">کیلو</p>
                              </div>
                          </div>
                  }
                  else{
                    return null
                  }
                })}
          </div>
        </div>
      </div>
      <button className="add-to-cart-butn" onClick={handleAddToCart}>اضافه به سبد</button>
    </div>
  );
};

export default Product;
