import React from 'react'
import { Helmet } from 'react-helmet'
import notfoundStyle from './NotFound.module.css';


export default function NotFound() {
  return ( <>

    <Helmet>
      <title>not found</title>
    </Helmet>

     <div className=" vh-100 fixed-top" >
   <img className ={`w-100 ${notfoundStyle.image}`} src={require('../../images/404.png')} alt="" />
 </div>
</>
)

  
}
