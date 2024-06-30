import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Await, Navigate, useParams } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
export default function ProductDetails() {
    

  const {id}= useParams();
   const{addProductToCart} =useContext(cartContext);
   
     async function addProduct(id) {
     const res= await addProductToCart(id);
    
     if(res) {
      
      toast.success('product added to your cart',{position:'top-center',style:{backgroundColor:'cyan'}})
      
    }
    else{
    
      toast.error('error occured',{position:'top-center', style:{backgroundColor:'darkgreen',color:'black'}})
    }
  }



  
    function getProductDetails() {
   return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id} `);
}
       const {isLoading,data,isError}= useQuery(`'productDetails-${id}`, getProductDetails) ;
        console.log('productDetails',data);
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
      if (isError) {
        return <Navigate to='/products'/>
      }
       const productDetails=data.data.data;

  return <>
  <Helmet>
   <title>{productDetails.title.split(' ').slice(0,2).join(' ')} product</title>
  </Helmet>



  <div className="container">
    <div className="row   align-items-center">
      <div className="col-md-3">
        <figure>
          <img className='w-100' src={productDetails.imageCover} alt={productDetails.title} />
        </figure>
      </div>
      <div className="col-md-9">
       <article>
           <h2>{productDetails.title}</h2>
           <p>{productDetails.description}</p>
           <h4>{productDetails.category.name}</h4>
           <div className=' d-flex justify-content-between '>
            {productDetails.priceAfterDiscount? <h5><span className=' text-decoration-line-through'>{productDetails.price}</span>-{productDetails.priceAfterDiscount}</h5>   : <h5>{productDetails.price}</h5>}
           
            <p>  <i style={{color:'orange'}}  className=' fa-solid fa-star '></i>{productDetails.ratingsAverage}</p>
           </div>
           
           <button onClick={()=>addProduct(productDetails.id)}className=' btn bg-main w-100 text-white'>Add to Cart +</button>
       </article>
      </div>
    </div>
  </div>
  
  
  
  
  </>
}
