import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { authContext } from '../../Context/AuthContext';
import brandStyles from './brand.module.css';
import { Helmet } from 'react-helmet';


export default function Brands() {
  const { token }= useContext(authContext);
  const [allBrands, setAllBrand] = useState('')
  const getBrands=async()=>{
    try{
      const response= await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      const data= response.data;
      if(data && data.data){
        setAllBrand(data.data)
        console.log(data.data);
      }
      return data
    }catch(error){
     console.log(error);
    }
  }


  useEffect(() => {
    getBrands();
  }, [token])

  if(!allBrands){
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
    <div className={brandStyles.width}>
    <div className="my-5">
    <h1 className='text-main fw-bolder text-center mb-4 pb-4'>All brands</h1>
    <Helmet>
          <title>Brands</title>
    </Helmet>
  <div className="row g-4 px-5 products">
    {allBrands && allBrands.map((brand,index)=>  <div key={index} className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
              <div type="button" className="card product" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
              <img className='card-img-top' src={brand.image} alt="" /> 
                 <div className="card-body">
                 <h3 className=' text-center h6'>{brand.name}</h3>
                </div>
                  </div>  
            </div>

            
    )}

  </div>

  {allBrands && allBrands.map((brand,index)=>
        <div key={index} className="modal fade" id={`exampleModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">
        <div className="modal-dialog">
       <div className="modal-content">
      <div className="modal-header">
      <h1 className="modal-title fs-5" id={`exampleModalLabel${index}`}></h1>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
      <div className="d-flex justify-content-between align-items-center">
        <div className="title ms-3">
          <h2 className='h1 text-main'>{brand.name}</h2>
          <p  className='text-muted'>{brand.name}</p>
        </div>

       <img className='w-50'  src={brand.image} alt={brand.name} />
      </div> 
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
    </div> 
  )}

</div>
    </div>  
  )
}
