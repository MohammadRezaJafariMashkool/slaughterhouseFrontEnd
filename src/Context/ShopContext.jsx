import React, {createContext, useState} from "react"
import AllProducts from '../Assets/all_product'

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for(let index = 0; index < AllProducts.length+1; index++){
        cart[index] = 0;
    }
    return cart
}

const ShopContextProvider = (props)=>{

    const[cartItems, setCartItems] = useState(getDefaultCart())
    // const addToCart = (itemId)=>{
    //     setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
    // }
    const addToCart = (itemId, quantity = 1) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + quantity,
        }));
    };
    
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }

    
    const contextValue = {AllProducts, cartItems, addToCart, removeFromCart };
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;