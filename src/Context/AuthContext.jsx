import React, {  useEffect, useState } from 'react'
import { createContext } from 'react';


export const authContext=createContext();
export default function AuthContextProvider({children}) {
  
  const [token, setToken] = useState(null);

  useEffect(() => { 
    const val = localStorage.getItem('tkn')
    if( val != null){
      setToken(val)
    }
  }, [])
  
  return <authContext.Provider value={{token ,setToken}}>
        {children}
  </authContext.Provider>
}
