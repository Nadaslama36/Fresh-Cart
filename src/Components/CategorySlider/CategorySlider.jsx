import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { FallingLines } from "react-loader-spinner";
import './Slider.css';
export default function CategorySlider() {

  function getCategories(){

   return  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  
 const {data,isLoading} =useQuery('categorySlider',getCategories);
    
 console.log(data?.data.data);
 if (isLoading) {
    return <div className=' d-flex bg-primary vh-100  bg-opacity-50 justify-content-center align-items-center'>
    <FallingLines
    color="#fff"
    width="100"
    visible={true}
     ariaLabel="falling-circles-loading"
     />
    </div>
 }

 


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {data.data.data.map((category,idx)=> <div key={idx}>
        <img  style={{height:'200px'}} className=" w-100 Category-slider" src={category.image} alt={category.name}/>

         <h3 className=" category-name ">{category.name}</h3>
        </div>
      )}
    </Slider>
  );
}