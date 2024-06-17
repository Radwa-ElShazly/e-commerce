import axios from 'axios';
import React, { useContext } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import ProductDetailsCSS from './ProductDetails.module.css';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';

export default function ProductDetails() { 
   let {id} = useParams()
   const {addProductToCart}= useContext(cartContext);
  

   const addProduct= async(id)=>{
      const res = await addProductToCart(id);
        
      if (res.status === 'success') {
       toast.success(res.message,{ duration: 2000,
         position: 'right-top',
         style: {
            border: '1px solid #000000',
            padding: '10px',
            color: '#000000',
            fontSize:'14.8px',
            margin:'9px 0px',
          },
         
      })
      }
      else{
        toast.error("Error Occurred",{ duration: 2000,
            position: 'right-top',
             style: {
               border: '1px solid #000000',
               padding: '10px',
               color: '#000000',
               fontSize:'14.8px',
               margin:'9px 25px',
             }}) 
      } 
    }
      

   const getProductDetails=()=>{
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   }
   const {data,isLoading, isError}=useQuery(`ProductDetails${id}`, getProductDetails);
   const productDetails=data?.data.data;

   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  
   if(isLoading){
    return <><div className="d-flex vh-100 bg-light justify-content-center align-items-center"> 
    <ThreeDots
    visible={true}
    height="80"
    width="80"
    color="gray"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
    </div></>
   }
   if(isError){
    return <Navigate to='/home'/>
   }
  return (
    <div className="container ">
            <Helmet>
          <title>{productDetails.title} Products</title>
        </Helmet>
        <div className="row my-5 py-5 px-md-0 px-5 ">

            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <figure>

<Slider {...settings}>
{productDetails.images.map((ele , indx)=>
  <img key={indx} className='w-100' src={ele} alt={productDetails.title} />
   )}
</Slider>

</figure>
            </div>

            
            <div className="col-xxl-9 col-xl-8  col-lg-8 col-md-6 col-sm-12">
             <figcaption className='mt-5 pt-5 px-xxl-5 mx-xxl-5 px-xl-4 mx-xl-4 px-md-1 mx-md-0'>
                <h6 className={ProductDetailsCSS.generalfont}>{productDetails.title}</h6>
                <h6 className={ProductDetailsCSS.font}>{productDetails.description}</h6>
                <p className='h6 ps-1 text-main'>{productDetails.category.name}</p>
                <div className="d-flex justify-content-between px-1 mb-2">
                    <div>{productDetails.price}  <span  className='ps-1'>EGP</span> </div>
                    <div>  <span><i className="fa-solid fa-star me-1" style={{ color: "#FFD43B" }}></i> </span>{productDetails.ratingsAverage}</div></div>
                <button onClick={()=> addProduct(productDetails._id)} className={'bg-main btn w-100 text-white fs-5' }>
                   <span className='pe-2' >+</span>
                   add to cart
                </button>
             </figcaption>
            </div>   

        </div>
    </div>
  )
}
