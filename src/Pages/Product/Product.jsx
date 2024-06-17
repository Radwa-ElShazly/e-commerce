import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/WishListContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Product() {
 
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
  }else{
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




const {addProductToWishlist, heart, deleteProductFromWishList}  = useContext(wishlistContext);
console.log(heart);



const addToWishList = async (id) =>{
  const res = await addProductToWishlist(id);
  if (res.status === 'success') {
  
    toast.success(res.message,{ duration: 2000,
      position: 'right-top',
      style: {
         border: '1px solid #000000',
         padding: '10px',
         color: '#000000',
         fontSize:'13.65px',
         margin:'9px 0px',
       },
      
   })
   }else{
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


const deleteFromWish= async(id)=>{
const res = await deleteProductFromWishList(id);
console.log(res);
if (res.status === 'success') {
  
  toast.success(res.message,{ duration: 2000,
    position: 'right-top',
    style: {
       border: '1px solid #000000',
       padding: '10px',
       color: '#000000',
       fontSize:'13.65px',
       margin:'9px 0px',
     },
    
 })
 }else{
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


const getAllProducts= async()=>{  
   return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
const {isLoading, data}=useQuery('getAllProducts', getAllProducts);

// console.log("data",data?.data.data);

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
  return <>
  <div className="container px-xl-0 px-5 ">
         <Helmet>
          <title>Products</title>
        </Helmet>
    
  <div className="products row my-5 gy-5 gx-3">
    {data?.data.data.map((product, idx) => {
      return    <div key={product._id || idx} className="product overflow-hidden col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
        <Link to={`/productDetails/${product._id}/${product.category.name}` }>        
        <div className="cursor-pointer">
          <img className="w-100" src={product.imageCover} alt={product.category.name} />
          <h3 className="h6 text-main px-2">{product.category.name}</h3>
          <h2 className="h6 ps-2">{product.title.split(' ').slice(0, 2).join(' ')}</h2>
          <div className="d-flex justify-content-between">
            {product.priceAfterDiscount ? (
              <p>
                <span className="text-decoration-line-through text-danger h6">{product.price}</span> - {product.priceAfterDiscount} EGP
              </p>
            ) : (
              <p>{product.price} EGP</p> 
            )}
            <p>
              <span>
                <i className="fa-solid fa-star me-1" style={{ color: "#FFD43B" }}></i>
              </span>
              {product.ratingsAverage}
            </p>
          </div>

        </div>
        </Link>




       <div className="d-flex justify-content-between">
       <button
        onClick={()=>addProduct(product._id)} 
        className={'bg-main btn w-75 text-white fs-6 mb-2' }> 
       <span className='pe-1' > + </span>
        add to cart</button>



        {!heart[product._id] ? (
        <span onClick={() => addToWishList(product._id)}>
          <i className="fa-regular fa-heart fs-2 cursor-pointer" style={{ color: "#000000" }}></i>
        </span>
      ) : (
        <span 
        onClick={()=>deleteFromWish(product._id)}
        >
          <i className="fa-solid fa-heart fs-2 cursor-pointer" style={{ color: '#c70000' }}></i>
        </span>
      )}

       </div>
      </div>
    }
 
    )}
  </div>
</div>
 </>
}
