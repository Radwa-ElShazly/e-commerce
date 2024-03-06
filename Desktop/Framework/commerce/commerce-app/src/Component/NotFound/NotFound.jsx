import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import notfoundStyle from './NotFound.module.css';

export default function NotFound() {
  return ( <>

      <Helmet>
        <title>not found</title>
      </Helmet>

       <div className="justify-content-center align-items-center vh-100 position-relative" >
     <img className ={`w-100 ${notfoundStyle.image}`} src={require('../../assets/finalProject assets/404.png')} alt="" />
   </div>
  </>
  )
}
