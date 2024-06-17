import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { authContext } from './AuthContext';


export const wishlistContext= createContext();

export default function WishListContextProvider({children}) {
  const [heart, setHeart] = useState({});
  const { token }= useContext(authContext);
const [allProducts, setAllProducts] = useState(null)
const addProductToWishlist = async (id)=>{
try{
   const response= await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
    {
        "productId": id  
      },
    {
        headers: { token: localStorage.getItem('tkn') }
    }) ;
   
   const data = response.data;
   if (data && data.data) {
    getUserWishList();
    setHeart((prevHeart) => ({ ...prevHeart, [id]: true }));
  }
   return data;
}catch(error){
    console.error('Error in addProductToCart:', error);
    return { status: 'error', message: error.message };
}
}


const deleteProductFromWishList = async (id)=>{
  try{
     const response= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
          headers: { token: localStorage.getItem('tkn') }
      }) ;
     
     const data = response.data;
     if (data && data.data) {
      getUserWishList();
      setHeart((prevHeart) => ({ ...prevHeart, [id]: false }));
    }
     return data;
  }catch(error){
      console.error('Error in addProductToCart:', error);
      return { status: 'error', message: error.message };
  }
  }

  const getUserWishList = async ()=>{
    try{
       const response= await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
    
        {
            headers: { token: localStorage.getItem('tkn') }
        }
      ) ;
       
       const data = response.data;
       if (data && data.data) {
        setAllProducts(data.data)
      }
       return data;
    }catch(error){
        console.error('Error in addProductToCart:', error);
        return { status: 'error', message: error.message };
    }
    }
    
useEffect(() => {
  getUserWishList()
}, [token])

  return <>
  <wishlistContext.Provider value={{addProductToWishlist, heart, deleteProductFromWishList, getUserWishList, allProducts}}>
    {children}
  </wishlistContext.Provider>
  
  </>
}
