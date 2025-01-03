import React, { useContext, useEffect, useState } from 'react'
import './AdminListProduct.css'
import enabledIcon from'../../Assets/Green-Circle.png'
import disabledIcon from'../../Assets/Red-Circle.png'
import placeholder from'../../Assets/Placeholder.png'
import {BackendUrl, ImagesUrl} from '../../Constants/userConstants';
import {ShopContext} from '../../Context/ShopContext';

const ListProduct = () => {

  const {AllProducts, cartItems, addToCart, removeFromCart, getTotalCartAmount} = useContext(ShopContext)  
  // const[allProducts, setAllProducts] = useState([]);
  // const[imagesState, setImagesState] = useState([]);
  // const [productDetails, setProductDetails] = useState({
  //   images: [],
  // });
    
  // Handles input change
  const handleInputChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value ? parseInt(value) || 0 : 0; // Update quantity
    setQuantities(newQuantities);
  };

  /*const fetchInfo = async () => {
    try {
      const response = await fetch(BackendUrl+'/allproducts',{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
        }});
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Check if the data has the expected structure
      if (data.success && Array.isArray(data.products)) {
        setAllProducts(data.products);
      } else {
        console.error('Unexpected API response:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };*/

  /*useEffect(()=>{
    fetchInfo();
  }, [])*/


 /* const remove_product = async (id, enable)=>{
      let productStatus = "enabled";
      if(enable === "enabled"){productStatus="disabled"}
      await fetch(BackendUrl+'/admin/product/'+id,{
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ enable: productStatus })
      })
      await fetchInfo();
  }*/

/*const updatePrice = async (id)=>{
      const priceLoc = parseInt(document.getElementsByName("price"+id)[0].value);
      const new_priceLoc = parseInt(document.getElementsByName("new_price"+id)[0].value);
      document.getElementsByName("new_price"+id)[0].value = "";
      document.getElementsByName("price"+id)[0].value = "";
      if(priceLoc > 0 && new_priceLoc > 0 ){
        await fetch(BackendUrl+'/admin/product/'+id,{
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ price: priceLoc, new_price: new_priceLoc})
      }).then((resp) => resp.json()).then((data) => {
        // Show success or failure alert based on the response
        if(data.success){
          alert("مبلغ این محصول با موفقیت بروزرسانی شد!")
        }
      else{
        alert("خطای سرور!!")
      }
      });
        await fetchInfo();
      }
      else{
        alert("لطفا هردو فیلد مربوطه را به درستی پر کنید!!")
      }
  }*/
 
// Handler function to update the 'image' state when a new image is selected
/*const imageHandler = (e) => {
  let im = [];
  for(let i=0; i<=3; i++){
      im.push(e.target.files[i]);
      if(i===3){
        setImagesState(im)
        console.log(imagesState)
      }
  }
  
};*/

/*const updatePicture = async (id) => {
  if(imagesState[0]){    
    let responseData;
    
    let formData = new FormData();
    // Assuming you have an array of 4 images
    for (let i = 0; i < 4; i++) {
      formData.append('products', imagesState[i]);
    }

    // Fetch request to upload the images to the server
    await fetch(BackendUrl+'/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => {
      responseData = data;
    });

    // If image upload is successful, update the product details and send a request to add the product
    if (responseData.success) {

      // Map each URL to an object with the 'url' and 'id' properties
      const imageObjects = responseData.image_urls.map((url, id) => ({ url, id }));

      // Update the state and wait for it to finish
      await setProductDetails(prevState => ({
          ...prevState,
          images: [...prevState.images, imageObjects],
      }));

      // Use the updated state for the request
      const updatedProductDetails = {
          ...productDetails,
          images: [...productDetails.images, ...imageObjects],
      };
      
      await fetch(BackendUrl+'/admin/product/'+id,{
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
        },
        body: JSON.stringify(updatedProductDetails)
      }).then((resp) => resp.json()).then((data) => {
        // Show success or failure alert based on the response
        if(data.success){
          alert("تصاویر جدید ذخیره شدند!")
          // Reload the page on success
          window.location.reload();
        }
        else{
          alert("خطا!!");
        }          
    });
    }
  }
  else{
    alert("ابتدا تصاویر خود را انتخاب کنید!!!")
  }
};*/

  

  return (
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
                                <img className="product-img" src={ImagesUrl+item.images[0].url} alt="" />
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
                                  <img className="product-img" src={ImagesUrl+item.images[0].url} alt="" />
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
  )
}

export default ListProduct