import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
           <img className="w-100" style={{height:'300px'}} src={require("../../images/images/slider-image-1.jpeg")} alt="slider-image-1" />
        </div>
        <div>
           <img className="w-100" style={{height:'300px'}} src={require("../../images/images/slider-image-2.jpeg")} alt="slider-image-2" />
        </div>
        <div>
           <img className="w-100" style={{height:'300px'}} src={require("../../images/images/slider-image-3.jpeg")} alt="slider-image-3" />
        </div>
        <div>
           <img className="w-100" style={{height:'300px'}} src={require("../../images/images/slider-2.jpeg")} alt="slider-2" />
        </div>
 
      </Slider>
    </div>
  );
}

export default SimpleSlider;