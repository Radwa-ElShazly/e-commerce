import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import { authContext } from './AuthContext';
export const cartContext =createContext();
export default function CartContextProvider({children}) {

const [numOfCartItems, setNumOfCartItems] = useState(0)
const [totalCartPrice, setTotalCartPrice] = useState(0)
const [allProducts, setAllProducts] = useState([])
const [cartID, setcartID] = useState(undefined)
const [cartOwner, setcartOwner] = useState(undefined)


const { token }= useContext(authContext);

    const addProductToCart = async (id) => {
      try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
          "productId": id
        }, {
          headers: { token: localStorage.getItem('tkn') }
        })
        const data =response.data
        if(data && data.data){
          getUserCart()
        }
        return response.data;
      } catch (error) {
        console.error('Error in addProductToCart:', error);
        return { status: 'error', message: error.message };
      }
    };
    


   

   const updateCount= async(id, newCount) =>{
  try{
    const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      "count": newCount
  }
  ,
  {
      headers: { token: localStorage.getItem('tkn') }
  }
  );

  const data = response.data;
  if (data && data.data) {
    setTotalCartPrice(data.data.totalCartPrice);
    setNumOfCartItems(data.numOfCartItems);
    setAllProducts(data.data.products);
  }
  return data;
  }catch(error){
    console.error('Error in getUserCart:', error);
    return { status: 'error', message: error.message };
  }
   }





    const removeUserFromCart = async (id) =>{
      try {
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
          headers: { token: localStorage.getItem('tkn') }
        });
    
        const data = response.data;
        if(data && data.data){
          setTotalCartPrice(data.data.totalCartPrice);
          setNumOfCartItems(data.numOfCartItems);
          setAllProducts(data.data.products);
        }
        return data;
      } catch (error) {
        console.error('Error in getUserCart:', error);
        return { status: 'error', message: error.message };
      }
    }

    const clearAllUsersFromCart = async () => {
      try {
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
          headers: { token: localStorage.getItem('tkn') }
        });
        const data = response.data;
        if (data.message == "success") {
          setTotalCartPrice(0);
          setNumOfCartItems(0);
          setAllProducts([]);
        }
        return data;
      } catch (error) {
        console.error('Error in clearAllUsersFromCart:', error);
        return { status: 'error', message: error.message };
      }
    };

    const getUserCart = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
          headers: { token: localStorage.getItem('tkn') }
        });
    
        const data = response.data;
        if (data && data.data) {
          setcartID(data.data._id);
          setTotalCartPrice(data.data.totalCartPrice);
          setNumOfCartItems(data.numOfCartItems);
          setAllProducts(data.data.products);
          localStorage.setItem('userID', data.data.cartOwner)

        }
        return data;
      } catch (error) {
        console.error('Error in getUserCart:', error);
        return { status: 'error', message: error.message };
      }
    };
    
    useEffect(() => {
      getUserCart();
    }, [token])
    

  return <> <cartContext.Provider value={{addProductToCart, getUserCart, removeUserFromCart, updateCount, clearAllUsersFromCart, numOfCartItems, totalCartPrice, allProducts, cartID 
    ,setNumOfCartItems , setAllProducts, setTotalCartPrice, cartOwner
  }}>
    {children}
  </cartContext.Provider>
   
  </>
  
}
