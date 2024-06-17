import axios from 'axios';
import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/CartContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Payment() {
    const {cartID, setNumOfCartItems , setAllProducts, setTotalCartPrice}=useContext(cartContext);
    console.log(cartID);
    const navigate = useNavigate();

    const shippingAddress = {
      details: "",
      phone: "",
      city: ""
  };
     const cashpayment = async () => {
     
  
      try {
          const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, 
              { shippingAddress },
              {
                  headers: { token: localStorage.getItem('tkn') }
              }
          );
  
          const data = response.data;
          console.log(data);
         
          if (data.status === "success") {
            
              toast.success("Payment completed successfully", {  duration: 2000, position: 'center-top',
                  style:
                   {
                      border: '1px solid #000000',
                      padding: '10px',
                      color: '#000000',
                      fontSize: '15px',
                      margin: '9px 0px',
                  }, 
                    }
          
            );
             
              setTimeout(() => {
                  navigate('/home');
              }, 2000);
              setNumOfCartItems(0);
              setTotalCartPrice(0);
              setAllProducts([])
          }
  
          return data;
      } catch (error) {
          toast.error("Error ...", {
              duration: 2000,
              position: 'right-top',
              style: {
                  border: '1px solid #000000',
                  padding: '10px',
                  color: '#000000',
                  fontSize: '15px',
                  margin: '9px 0px',
              },
          });
      }

      
  
  };
  
  const onlinePayment = async (values) => {
   

    try {
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`, 
            { shippingAddress: values},
            {
                headers: { token: localStorage.getItem('tkn') }
            },
            {
               params:{url:'http://localhost:3000'}  
            }
           
        );

        const data = response.data;
        
       
        if (data) {
          
          console.log(data);
            window.open(data.session.url, "_self")
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            setAllProducts([])
        }

        return data;
    } catch (error) {
        toast.error("Error ...", {
            duration: 2000,
            position: 'right-top',
            style: {
                border: '1px solid #000000',
                padding: '10px',
                color: '#000000',
                fontSize: '15px',
                margin: '9px 0px',
            },
        });
    }

    

};
  

   


const validationSchema = Yup.object({
  phone: Yup.string()
  .matches(/^01[0125][0-9]{8}$/, 'Phone number is not valid')
  .required('Phone is required'),
  city: Yup.string()
      .matches(/^[a-zA-Z\s]{4,}$/, 'City must only contain letters and spaces')
      .required('City is required')
    
});


   const paymentFormik= useFormik({
    initialValues:shippingAddress,
    onSubmit:cashpayment,
    validationSchema:validationSchema,

  })





  return <> <div className="w-50 m-auto">
          <Helmet>
          <title>Payment Method</title>
        </Helmet>
   <form onSubmit={paymentFormik.handleSubmit} action="">

    <div className="d-flex mt-5 mb-3">
         <div className="inputForm px-2 w-50">
        <label htmlFor="city">City</label>
        <input onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} value={paymentFormik.values.city} type="text" id='city' placeholder='city' className='form-control' />
        {paymentFormik.errors.city  && paymentFormik.touched.city?<div className='alert alert-danger'>{paymentFormik.errors.city}</div>:''}
        </div>  

        <div className="inputForm  px-2 w-50">
        <label htmlFor="phone"> Phone</label>
        <input  onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} value={paymentFormik.values.phone} type="tel" id='phone' placeholder='phone' className='form-control' />
        {paymentFormik.errors.phone  && paymentFormik.touched.phone?<div className='alert alert-danger'>{paymentFormik.errors.phone}</div>:''}
        </div>  
    </div>



        <div className="inputForm px-2 mb-4 ">
        <label htmlFor="details">Details</label>
        <textarea  onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} value={paymentFormik.values.details} id='details' placeholder='detials'  className='form-control' rows={'7'} > </textarea>
         </div> 


  
  <div className="d-flex  justify-content-end">
            <div className="btnForm d-flex  pe-4">
             <button type='submit' className='bg-main btn text-white px-4 py-2'>
             Confirm Cash Payment
             </button>
      </div>  
        

      <div className="btnForm d-flex ">
             <button onClick={()=>onlinePayment(paymentFormik.values)}  type='button' className='btn btn-primary text-white px-4 py-2'>
             Confirm online Payment
             </button>
      </div>  
  </div>



        

      </form>
  </div>
  </>
}
