import React, { useContext, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import cartStyles from './cart.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Cart() {
 const {totalCartPrice, allProducts, removeUserFromCart , updateCount,clearAllUsersFromCart} =useContext(cartContext);
//  console.log(allProducts);
const [isLoading, setisLoading] = useState(false)

const deleteMyProduct=async(id)=>{
  setisLoading(true)
const res =await removeUserFromCart(id);
if(res){
  setisLoading(false)
  toast.success("product delete successfully",{ duration: 2000,
    position: 'right-top',
    style: {
       border: '1px solid #000000',
       padding: '10px',
       color: '#000000',
       fontSize:'15px',
       margin:'9px 0px',
     },
})
}else{
setisLoading(false)
  toast.error("Error Occurred", {duration: 2000,
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

const clearAllUsers=()=>{
  clearAllUsersFromCart() 
}

const updateMyProductCount = async(id, newCount)=>{
 const res = await updateCount(id, newCount);
 console.log(res);

 if (res) {
  toast.success("product update successfully",{ duration: 2000,
    position: 'right-top',
    style: {
       border: '1px solid #000000',
       padding: '10px',
       color: '#000000',
       fontSize:'15px',
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


  return (
    <div className={cartStyles.width}>
      <div className="container-fluid bg-light p-5">
      <Helmet>
          <title>Cart</title>
        </Helmet>
       <div className="d-flex align-items-center justify-content-between">
                <div>
           <h2>Shop Cart :</h2>
        <h2 className="h5 text-main mt-2 pt-1 font-weight">
          Total Cart Price : {totalCartPrice} EGP
        </h2>
        </div>

        {allProducts.length?   <Link to={'/payment'}>
        <button className='btn btn-primary btn-gradient fs-5'>Confirm Payments</button>
        </Link>:''}
     


       </div>


        {allProducts.length? <>
            {allProducts.map((item, idx) => (
              <div
                key={item.id || idx}
                className="row align-items-center pt-4 border-bottom border-body-secondary mx-md-0 mx-5"
              >
                <div className="col-xl-2 col-md-4 col-12">
                  <figure>
                    <img
                      className="w-100"
                      src={item.product.imageCover}
                      alt={item.product.title}
                    />
                  </figure>
                </div>
                <div className="col-xl-7 col-md-4 col-12">
                  <article>
                    <h3 className={cartStyles.fontSize}>{item.product.title}</h3>
                    <h5 className={cartStyles.fontPrice}>Price: {item.price}</h5>
                    <span
                      onClick={() => deleteMyProduct(item.product._id)}
                      className={`${cartStyles.fontSize} cursor-pointer`}
                      role="button"
                      aria-label={`Remove ${item.product.title} from cart`}
                    >
                      <i className="fa-regular fa-trash-can text-main me-2"></i>
                      Remove
                    </span>
                  </article>
                </div>
                <div className="col-xl-3 col-md-4 col-12">
                  <div className="d-flex align-items-center justify-content-end">
                    <button 
                      onClick={() => updateMyProductCount(item.product._id, item.count + 1)} 
                      className="btn btn-outline-success"
                      aria-label={`Increase quantity of ${item.product.title}`}
                    >
                      +
                    </button>
                    <p className="pt-3 px-3">{item.count}</p>
                    <button 
                      disabled={item.count === 1} 
                      onClick={() => updateMyProductCount(item.product._id, item.count - 1)} 
                      className="btn btn-outline-success"
                      aria-label={`Decrease quantity of ${item.product.title}`}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 d-flex justify-content-center">
              <button 
                onClick={clearAllUsers}
                className="btn btn-outline-danger px-4 py-3"
                aria-label="Clear all items from cart"
              >
                Clear All Items
              </button>
            </div>
          </>: 
          <p className="h1 mt-4 fw-bold">Cart Is Empty.</p>
        }
      </div>
    </div>
  );


}
