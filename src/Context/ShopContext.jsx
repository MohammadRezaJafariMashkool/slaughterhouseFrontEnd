import React, {createContext, useEffect, useState} from "react"
import {BackendUrl} from '../Constants/userConstants';
//import AllProducts from '../Assets/all_product'

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for(let index = 0; index < 300+1; index++){
        cart[index] = 0;
    }
    return cart
}

const ShopContextProvider = (props)=>{

    const [AllProducts, setAllProducts] = useState([]);
    const [AllProductsAdmin, setAllProductsAdmin] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [AllAds, setAllAds] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const[cartItems, setCartItems] = useState(getDefaultCart())


    // get products
    useEffect(() => {
        fetch(BackendUrl+'/products')
            .then((response) => response.json())
            .then((data) => {
                setAllProducts(data.products);
                setLoading(false); // Set loading to false when data is loaded
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    // get all products Admin
    useEffect(() => {
        if(localStorage.getItem('user-role')==='admin'){
            fetch(BackendUrl+'/admin/allproducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensure cookies are included in the request/response
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.products)
                    setAllProductsAdmin(data.products);
                    setLoading(false); // Set loading to false when data is loaded
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Set loading to false in case of an error
                });
        }
    }, []);

    // get users list admin
    useEffect(() => { 
        if(localStorage.getItem('user-role')==='admin'){
            fetch(BackendUrl+'/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensure cookies are included in the request/response
            })
                .then((response) => response.json())
                .then((data) => {
                    setUsersList(data.users);
                    setLoading(false); // Set loading to false when data is loaded
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Set loading to false in case of an error
                });
        }
    }, []);

    // get orders list
    useEffect(() => {
        
        // Admin User's Orders list
        if(localStorage.getItem('user-role')==='admin'){
            fetch(BackendUrl+'/admin/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensure cookies are included in the request/response
            })
                .then((response) => response.json())
                .then((data) => {
                    setOrdersList(data.orders);
                    setLoading(false); // Set loading to false when data is loaded
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Set loading to false in case of an error
                });
        }

        // Normal User's Orders list
        else if(localStorage.getItem('user-role')){
            fetch(BackendUrl+'/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensure cookies are included in the request/response
            })
                .then((response) => response.json())
                .then((data) => {
                    setOrdersList(data.products);
                    setLoading(false); // Set loading to false when data is loaded
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Set loading to false in case of an error
                });
        }
    }, []);

    // get adds
    useEffect(() => {

        // Admin User's ads list
        if(localStorage.getItem('user-role')==='admin'){
            fetch(BackendUrl+'/admin/allads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensure cookies are included in the request/response
            })
                .then((response) => response.json())
                .then((data) => {
                    setAllAds(data.orders);
                    setLoading(false); // Set loading to false when data is loaded
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Set loading to false in case of an error
                });
        }

        // Normal User's ads list
        else if(localStorage.getItem('user-role')){
            fetch(BackendUrl+'/ads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensure cookies are included in the request/response
            })
                .then((response) => response.json())
                .then((data) => {
                    setAllAds(data.products);
                    setLoading(false); // Set loading to false when data is loaded
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false); // Set loading to false in case of an error
                });
        }
    }, []);

    const addToCart = (itemId, quantity = 1) => {
      
        // Replace the quantity of the item with the new quantity if the item ID matches
        setCartItems((prev) => ({
          ...prev,
          [itemId]: quantity, // Set the quantity directly for the itemId
        }));
      };
        

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }
    const clearCart = () => {setCartItems({});}    
    const getTotalCartAmount = ()=>{
         let totalAmount = 0;
         for(const item in cartItems){
             if(cartItems[item]>0){
                 let itemInfo= AllProducts.find((product)=>product._id === item)
                 totalAmount += Number(itemInfo.new_price) * Number(cartItems[item]);
             }
         }
        return totalAmount
    }
    const getTotalCartItems = ()=>{        
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems += Number(cartItems[item]);
            }
        }
       return totalItems;
    }    
    const contextValue = {AllProductsAdmin, usersList, ordersList, setOrdersList, setAllProductsAdmin, allSchedules, AllAds, AllProducts, cartItems, addToCart, removeFromCart, clearCart, getTotalCartAmount, getTotalCartItems};    
    if (loading) {
        return <div>Loading...</div>;
    }
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
    
}

export default ShopContextProvider;