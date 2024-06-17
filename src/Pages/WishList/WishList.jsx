import React, { useContext } from 'react'
import { wishlistContext } from '../../Context/WishListContext';
import { ThreeDots } from 'react-loader-spinner';
import wishListStyles from './wishList.module.css';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function WishList() {

  const {deleteProductFromWishList, allProducts, heart} =useContext(wishlistContext)
  // console.log(allProducts);

  
 
const deleteMyProduct=async(id)=>{
 const res = await deleteProductFromWishList(id);
 if(res){
  toast.success("product remove from wishList successfully",{ duration: 2000,
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


  if(!allProducts){
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
  <div className={wishListStyles.width}>
    <div className="container-fluid bg-light p-5">
    <Helmet>
             <title>WishList</title>
    </Helmet>
      <h2 className='ps-4 ms-3 fw-bold'>My WishList :</h2>
      {allProducts.length > 0 ? (
        allProducts.map((item, idx) => (
          <div key={item.id || idx} className={`row align-items-center pt-4 border-bottom border-body-secondary mx-md-0 mx-5 
          ${wishListStyles.posRelative}`}>
            <div className="col-xl-3 col-md-4 col-12">
              <figure className='px-xxl-4 mx-xxl-2'>
                <img className="w-100" src={item.imageCover} alt={item.title} />
              </figure>
            </div>
            <div className="col-xl-9 col-md-8 col-12">
              <article>
                <h3 className='fw-bold h2'>{item.title}</h3>
                <h3 className={wishListStyles.fontSize} >{item.description}</h3> 


                
                <h5 className={wishListStyles.posAbsolute}>quantity: {item.quantity} items</h5>



                <div className="d-flex justify-content-between mt-4 px-3 mx-1">
                <p className='fs-5'>
              <span>
                <i className="fa-solid fa-star me-2 mt-4" style={{ color: "#FFD43B" }}></i>
              </span>
              {item.ratingsAverage}
               </p>  



                 {heart?
                         <span onClick={()=>deleteMyProduct(item._id)} className={wishListStyles.heartSize}>
                         <i className="fa-solid fa-heart cursor-pointer" style={{ color: '#c70000' }}></i>
                       </span>:
                            <span>
                            <i className="fa-regular fa-heart fs-2 cursor-pointer" style={{ color: "#000000" }}></i>
                          </span>}       
                </div>

 
              </article>
            </div>

          </div>
        ))
      ) : (
        <p className="h1 mt-5 fw-bold ms-4 ps-3">Wishlist Is Empty.</p>
      )}
    </div>
  </div>
);

 

}
