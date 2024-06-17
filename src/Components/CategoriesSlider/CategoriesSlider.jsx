import axios from 'axios';
import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';



export default function CategoriesSlider() {
  
  const smallDevices = useMediaQuery({ maxWidth: 768 }); 
  const mediumDevices = useMediaQuery({ maxWidth: 991.98 }); 
  const largeDevices = useMediaQuery({ maxWidth: 1199.98 }); 
  const XLargeDevices = useMediaQuery({ maxWidth: 1299.98 }); 
    const getCategories=()=>{
      return  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
  const {data, isLoading}  =useQuery("CategoriesSilder", getCategories)
     const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: smallDevices?1 : mediumDevices?4:largeDevices?4: XLargeDevices?6: 7,
        slidesToScroll: 7
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
      return (
        <div className="slider-container my-5">
          <Slider {...settings}>
            {data.data.data.map((category, idx)=> 
            <div  key={idx}>
              <img style={{height:'200px'}} className='w-100' src={category.image} alt={category.name} />
              <h4 className='h6'>{category.name}</h4>
            </div>
            )}
     
          </Slider>
        </div>
      );
}
