import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Login() {

 const [isSuccess, setisSuccess] = useState(false);
 const [errMessage, seterrMessages] = useState(undefined);
 const [isLoading, setisLoading] = useState(false);
 const navigate = useNavigate();
 const {setToken} = useContext(authContext);

  const userData ={
    email:'',
    password:'',
  }


async function mySubmit(values){
  setisLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then( (response)=>{
      if(response.data.message === "success"){
      //  console.log("Token", response.data.token);  
       setToken(response.data.token)   
       localStorage.setItem("tkn", response.data.token)   
       setisSuccess(true);
       setTimeout(()=>{
        setisSuccess(false);
         navigate('/home')
       },2000)
      }


      
    }).catch((error)=>{
     seterrMessages(error.response.data.message)
  
    }).finally(()=>{
      setisLoading(false)
    })

  }

 const registerFormik= useFormik({
    initialValues:userData,
    onSubmit:mySubmit,
    // values => be5d elle object
    validate: values=>{
      const errors ={}
       if(values.email.includes('@') !== true || values.email.includes('.') !== true){
          errors.email='Follow standard email format, including "." and "@"'
      }
      if( values.password.length < 6  || values.password.length > 12 ){
        errors.password="Must be between 6 and 12 characters."
        }
          // console.log("errors:",errors);
      return errors;
    }
  })

  return (
    <div className="w-75 m-auto my-5">
        <Helmet>
          <title>Login</title>
        </Helmet>
     <h2>Login Now</h2>
 
     {isSuccess ? 
       <div className="alert alert-success text-center my-4">Welcome back.</div> 
      : errMessage ? 
       <div className="alert alert-danger text-center my-4">{errMessage}</div> 
      : ''

}
     <form onSubmit={registerFormik.handleSubmit}  action="">


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



      <div className="btnForm d-flex justify-content-between">
        
      <Link to={'/forgetPassword'}>
           <p className='h4 fw-bold text-main'>forget your password ?</p>
        </Link>



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
  />: "Login"}
</button>
      </div>
        

     </form>
    </div>
  )
}
