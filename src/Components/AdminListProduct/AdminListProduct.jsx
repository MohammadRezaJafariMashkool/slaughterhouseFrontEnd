import React, { useContext, useEffect, useState } from 'react'
import { BackendUrl, ImagesUrl } from '../../Constants/userConstants';
import './AdminListProduct.css'
import enabledIcon from'../../Assets/Green-Circle.png'
import disabledIcon from'../../Assets/Red-Circle.png'
import placeholder from'../../Assets/Placeholder.png'
import {ShopContext} from '../../Context/ShopContext';

const ListProduct = () => {

  const {AllProducts, cartItems, addToCart, removeFromCart, getTotalCartAmount} = useContext(ShopContext)  
  const authToken = localStorage.getItem('auth-token'); // Retrieve auth token
  const userRole = localStorage.getItem('user-role'); // Retrieve auth token

  // Add product section states
  const[addProductVisibility, setAddProductVisibility] = useState("none");
  const[addProductBtnTxt, setAddProductBtnTxt] = useState("محصول جدید");
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductAmount, setNewProductAmount] = useState(0);
  const [newProductCategory, setNewProductCategory] = useState("Sheep");
  const [newProductImage, setNewProductImage] = useState([]);

  // Show Or Hide the add product section
  const showOrHideAddProductDiv = ()=>{
    addProductVisibility==="none"?setAddProductVisibility("flex"):setAddProductVisibility("none")
    addProductBtnTxt==="بستن"?setAddProductBtnTxt("محصول جدید"):setAddProductBtnTxt("بستن")
  };

  // Choosing image
  const handleFileChange = (e) => {
    console.log("File change detected");
    const files = e.target.files;
    if (files && files.length > 0) {
      setNewProductImage(Array.from(files));
    } else {
      setNewProductImage([]); // Reset state if no files are selected
    }
    e.target.value = ""; // Reset the input value to ensure onChange fires again
  };
  

  // Send new product to the server
  const addNewProduct = async ()=>{
    if (!authToken) {
      alert('شما باید وارد حساب کاربری خود شوید.');
      return;
    }

    if (newProductName === '' || newProductImage.length === 0) {
      alert('لطفاً نام و یک تصویر را وارد کنید.');
      return;
    }
    if (userRole !== "admin") {
      alert('شما ادمین نیستید.');
      return;
    }

    try {
      // Step 1: Upload images
      const formData = new FormData();
      formData.append('type', 'product'); // Add the type
      for (let i = 0; i < newProductImage.length; i++) {
        formData.append('files', newProductImage[i]); // Add image files
      }

      const uploadResponse = await fetch(`${BackendUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        alert('خطا در آپلود تصاویر: ' + uploadData.message);
        return;
      }

      // Convert image URLs array to a single string
      const uploadedImageUrls = uploadData.image_urls.join(','); // Convert array to a comma-separated string
      const name = newProductName; 
      const price = newProductPrice; 
      const new_price = newProductPrice; 
      const stock = newProductAmount; 
      const category = newProductCategory;
      // Step 2: Submit the ad with uploaded image URLs
      const adData = {
        name,
        new_price,
        stock,
        price,
        category,
        image: uploadedImageUrls, // Send the URLs as a string
      };

      const response = await fetch(`${BackendUrl}/admin/product/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authToken,
        },
        body: JSON.stringify(adData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert('محصول جدید با موفقیت ثبت شد!');        
        setNewProductName('');
        setNewProductPrice(0);
        setNewProductAmount(0);
        setNewProductCategory("Sheep");
        setNewProductImage([]);
      } else {
        alert('خطایی رخ داده است: ' + responseData.message);
      }
    } catch (error) {
      console.error('Error submitting ad:', error);
      alert('خطایی در ارسال محصول رخ داده است.');
    }
  }

  return (
    <div className="products-manager-container" id="productprice">
        <div className="btns-row">
          <div className="btn-addproduct" onClick={showOrHideAddProductDiv}><p>{addProductBtnTxt}</p></div>
          <div className="btn-savechanges"><p>ذخیره تغییرات</p></div>
        </div>
        <div className="add-new-product-container" style={{display:addProductVisibility}}>
            <label>نام محصول</label>
            <input type="text" value={newProductName} onChange={(e)=>{setNewProductName(e.target.value)}}/>
            <label>نوع محصول</label>
            <select id="category-select" value={newProductCategory} onChange={(e)=>{setNewProductCategory(e.target.value)}}>
              <option value="Cow">گاو</option>
              <option value="Sheep">گوسفند</option>
            </select>
            <label>قیمت محصول</label>
            <input type="number" value={newProductPrice} onChange={(e)=>{setNewProductPrice(e.target.value)}}/>
            <label>موجودی انبار</label>
            <input type="number" value={newProductAmount} onChange={(e)=>{setNewProductAmount(e.target.value)}}/>
            <label htmlFor="file-upload-new-product" className="add-new-product-file-upload-label">
                تصویر محصول
            </label>            
            <input id="file-upload-new-product" type="file" onChange={handleFileChange} className="file-upload-input"/>
            <button className="adinputbtn" onClick={addNewProduct}>ذخیره محصول</button>
        </div>
        <div className="admin-products-list-container">
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
                                <img className="product-img" src={ImagesUrl+item.image} alt="" />
                                <p className="product-name">{item.name}</p>
                                <input className="product-amount-txb" type="number" defaultValue={item.new_price}/>
                                <p className="product-price-sign">تومان مقدار:</p>                           
                                <input className="product-amount-txb" type="number" defaultValue={item.stock}/>
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
                                  <img className="product-img" src={ImagesUrl+item.image} alt="" />
                                  <p className="product-name">{item.name}</p>
                                <input className="product-amount-txb" type="number" defaultValue={item.new_price}/>
                                <p className="product-price-sign">تومان مقدار:</p>                           
                                <input className="product-amount-txb" type="number" defaultValue={item.stock}/>
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
      </div>
  )
}

export default ListProduct