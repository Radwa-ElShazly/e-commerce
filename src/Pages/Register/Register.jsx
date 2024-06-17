import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDZjMGY5YmI0MWFmMDFkNTcxNzE2OSIsIm5hbWUiOiJSYWR3YSBIYXNzYW4iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNzMzMjc5NSwiZXhwIjoxNzI1MTA4Nzk1fQ.9miKDZsZBmkPTOYWzBjRP-DRle7ctnq1GBcYgpe4LFk

export default function Register() {
  //e.preventdefult()
  // obj => include  el data => input values
  //  function onSubmit(e){
  //     e.prevent`Default();
  //     console.log("hello");
  //  }
 const [isSuccess, setisSuccess] = useState(false);
 const [errMessage, seterrMessages] = useState(undefined);
 const [isLoading, setisLoading] = useState(false);
 const navigate = useNavigate();
  const userData ={
    name: '',
    email:'',
    password:'',
    rePassword:'',
    phone:'',

  }

async function mySubmit(values){
    setisLoading(true);
    // console.log('submitted......',values);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then( (response)=>{
      //  console.log("in case of success: x", response);
       setisSuccess(true);
       setTimeout(()=>{
        setisSuccess(false);
         navigate('/login')
       },2000)
      
    }).catch((error)=>{
     console.log("in case of error: x", error.response.data.message);
     seterrMessages(error.response.data.message)
  
    }).finally(()=>{
      setisLoading(false)

      console.log("finally step");
    })
  }
  // formik => handle form state

 const registerFormik= useFormik({
    initialValues:userData,
    onSubmit:mySubmit,
    // values => be5d elle object.
    validate: values=>{
      const errors ={}
      const nameRegex =/^[A-Z][a-z]{3,7}$/
      const phoneRegex =/^01[0125][0-9]{8}$/
      if( nameRegex.test(values.name) === false) {
          errors.name ="Name must be from 4 to 8 character start with capital letter"
      }if(values.email.includes('@') !== true || values.email.includes('.') !== true){
          errors.email="Email must be in format"
      }if(phoneRegex.test(values.phone) === false){
      errors.phone="phone must be an Egyptian Number"
      }
      if( values.password.length < 6  || values.password.length > 12 ){
        errors.password="phone must be from 6 to 12 character"
        }
        if( values.password !== values.rePassword ){
          errors.rePassword="password and repassword don't match"
          }
          // console.log("errors:",errors);
      return errors;
    }
  })

  return (
    <div className="w-75 m-auto my-5">
         <Helmet>
             <title>Register</title>
        </Helmet>
     <h2>Register Now</h2>
 
     {isSuccess ? 
  <div className="alert alert-success text-center my-4">Congratulations, your account has been created.</div> 
  : errMessage ? 
      <div className="alert alert-danger text-center my-4">{errMessage}</div> 
      : ''

}
     <form onSubmit={registerFormik.handleSubmit}  action="">
      <div className="inputForm mt-3">
        <label htmlFor="name">name: </label>
        <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.name} autoComplete='username' id='name' type="text" placeholder='name' className='form-control mb-3'/>
         {registerFormik.errors.name && registerFormik.touched.name? <div className='alert alert-danger'>{registerFormik.errors.name}</div>:''}
      </div>

      <div className="inputForm mt-3">
        <label htmlFor="email">email: </label>
        <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.email} autoComplete='useremail' id='email' type="email" placeholder='email' className='form-control mb-3'/>
        {registerFormik.errors.email && registerFormik.touched.email? <div className='alert alert-danger'>{registerFormik.errors.email}</div>:''}
      </div>

      <div className="inputForm mt-3">
        <label htmlFor="password">password: </label>
        <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.password} autoComplete="userpassword" id='password' type="password" placeholder='password' className='form-control mb-3'/>
        {registerFormik.errors.password && registerFormik.touched.password? <div className='alert alert-danger'>{registerFormik.errors.password}</div>:''}
      </div>

      <div className="inputForm mt-3">
        <label htmlFor="rePassword">repassword: </label>
        <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.rePassword} autoComplete="on" id='rePassword' type="password" placeholder='repassword' className='form-control mb-3'/>
        {registerFormik.errors.rePassword && registerFormik.touched.rePassword? <div className='alert alert-danger'>{registerFormik.errors.rePassword}</div>:''}
      </div>

      <div className="inputForm mt-3">
        <label htmlFor="phone">phone: </label>
        <input onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} value={registerFormik.values.phone} autoComplete="userphone" id='phone' type="tel" placeholder='phone' className='form-control mb-3'/>
        {registerFormik.errors.phone && registerFormik.touched.phone? <div className='alert alert-danger'>{registerFormik.errors.phone}</div>:''}
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
             colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  />: "Register"}
</button>
      </div>
   
     </form>
    </div>
  )
}

