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
    const [AllAds, setAllAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const[cartItems, setCartItems] = useState(getDefaultCart())



    useEffect(() => {
        fetch(BackendUrl+'/allproducts')
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

    useEffect(() => {
        fetch(BackendUrl+'/allads')
            .then((response) => response.json())
            .then((data) => {
                setAllAds(data.products);
                setLoading(false); // Set loading to false when data is loaded
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);



    //const addToCart = (itemId)=>{setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))}

    const addToCart = (itemId, quantity = 1) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + quantity,
        }));
    };
    
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
         let totalAmount = 0;
         for(const item in cartItems){
             if(cartItems[item]>0){
                 console.log("Tototal= "+totalAmount)
                 let itemInfo= AllProducts.find((product)=>product.id === Number(item))
                 totalAmount += itemInfo.new_price * cartItems[item];
             }
         }
        return totalAmount
    }

    const getTotalCartItems = ()=>{        
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems += cartItems[item];
            }
        }
       return totalItems;
    }

    
    const contextValue = {AllProducts, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};
    
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