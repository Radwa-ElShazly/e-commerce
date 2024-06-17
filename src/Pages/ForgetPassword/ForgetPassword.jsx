import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();
   
   
   
   async function mySubmit(values){
     setisLoading(true);
       axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
       .then( (response)=>{
        console.log(response);
         if(response.data.statusMsg === "success"){
          setTimeout(()=>{
            navigate('/verify-code')
          },2000)
         }

       }).catch((error)=>{
       console.log(error);
     
       }).finally(()=>{
         setisLoading(false)
       })
   
     }
   
    const formik= useFormik({
       initialValues:{
        email:""
    },
       onSubmit:mySubmit,
       validate: values=>{
         const errors ={}
          if(values.email.includes('@') !== true || values.email.includes('.') !== true){
             errors.email='Follow standard email format, including "." and "@"'
         }
             // console.log("errors:",errors);
         return errors;
       }
     })
   
     return (
       <div className="w-75 m-auto my-5">
              <Helmet>
          <title>Forget Password</title>
        </Helmet>
        <h2 className='fw-bold'>please enter your verification code</h2>

        <form 
        onSubmit={formik.handleSubmit}
          action="">
   
   
         <div className="inputForm mt-3">
           <label htmlFor="email">email: </label>
           <input 
           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} autoComplete='useremail'
            id='email' type="email" placeholder='email' className='form-control mb-3 mt-1 py-3'/>
           {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div>:''}
         </div>
   
   
   
         <div className="btnForm d-flex justify-content-end">
           

   
                <button type='submit' className='bg-main btn text-white px-4 py-2'>
                 {isLoading?
                <ColorRing
                 visible={true}
                 height="35"
                 width="35"
                 ariaLabel="color-ring-loading"
                 wrapperStyle={{}}
                 wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />: 
    " verify"
    }

   </button>
         </div>
           
   
        </form>
       </div>
     )
}
