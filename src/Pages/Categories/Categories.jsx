import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContext';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import categoryStyle from './categories.module.css';
import { Helmet } from 'react-helmet';


export default function Categories() {
  const { token }= useContext(authContext);
  const [allCategories, setCategories] = useState('')
  const [category, setCategory] = useState('')
  const getAllCategories=async()=>{
    try{
      const response= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      const data= response.data;
      if(data && data.data){
        setCategories(data.data)
        console.log(data.data);
      }
      return data
    }catch(error){
     console.log(error);
    }
  }

  const getspecificCategories=async()=>{
    try{
      const response= await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories')
      const data= response.data;
      if(data && data.data){
        setCategory(data.data)
        console.log(data.data);
      }
      return data
    }catch(error){
     console.log(error);
    }
  }

  
  const getsubcategories=async(id)=>{
    try{
      const response= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      const data= response.data;
      if(data && data.data){
        console.log(data.data);
      }
      return data
    }catch(error){
     console.log(error);
    }
  }


  useEffect(() => {
    getAllCategories();
    getspecificCategories();
    getsubcategories();
  }, [token])


  if(!allCategories){
    return<>      
<div className="d-flex vh-100 bg-light justify-content-center align-items-center"> 
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
    <div className={categoryStyle.width}>
          <div className="container-fluid my-5">
          <Helmet>
          <title>Categories</title>
        </Helmet>
    <div className="row g-4 products">
      {allCategories && allCategories.map((category,index)=>{
             return   <div key={index} className="col-xl-4 col-lg-6">
                <div className="card product"
                >
                <img className={`w-100 ${categoryStyle.image}`}  style={{height:'350px'}} src={category.image} alt={category.name} /> 
                   <div className="card-body">
                   <h3 className='mainColor text-center'>{category.name}</h3>
                  </div>
                    </div>
              </div>
      })}
    </div>
  </div>
    </div>

  )
}
