import React from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { cartContext } from '../Context/CartContext';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Products() {
    const {addProductToCart}= useContext(cartContext);
    const [search, setSearch] = useState("")



    async function addProduct(id) {
     const res= await addProductToCart(id)
     if (res){
      toast.success('product added to your cart',{position:'top-center',style:{backgroundColor:'cyan'}})
     }
     else{
       toast.error('error occured',{position:'top-center',style:{backgroundColor:'darkgreen',color:'black'}})
     }
    } 
    
    async function getAllProducts(){
    
    return  await axios.get('https://ecommerce.routemisr.com/api/v1/products');
   
    };

   const { error,isLoading,data,isFetching}= useQuery('getAllProducts',getAllProducts);
 
   
    if (isLoading) { 
    return  <div className=' d-flex bg-primary vh-100  bg-opacity-50 justify-content-center align-items-center'>
     <FallingLines
     color="#fff"
     width="100"
     visible={true}
      ariaLabel="falling-circles-loading"
      />
     </div>
    }
   

  return <>
  <Helmet>
  <title>Products</title>
 </Helmet>
  <div className="container">
  <div className="  w-50 m-auto ">
        <div className=' input '>
        <input    type="search" className=' form-control' placeholder='Search' onChange={(e)=>setSearch(e.target.value)} />

          </div> 
       </div>
  <div className=" products row mt-3 gy-3 ">
       
       {data.data.data.filter((product)=>{
        if(search===""){
         return product
        }
        else if(product.title.split(' ').slice(0,2).join(' ').toLowerCase().includes(search.toLowerCase())){
          return product
        }
       })  
       .map((product,idx)=> {return <div key={idx} className="col-md-2 overflow-hidden">
            <Link to={`/productDetails/${product.id}`} >
            
            <div className='product'>
              <img src={product.imageCover} className=' w-100' alt="" />
              <h3 className=' h6 text-main'>{product.category.name}</h3>
              <h2 className=' h4 text-center'>{product.title.split(' ').slice(0,2).join(' ') }</h2>
              <div className=' d-flex justify-content-between'>

                {product.priceAfterDiscount? <p><span className='  text-decoration-line-through  '>{product.price} </span> - {product.priceAfterDiscount}</p>:<p>{product.price}</p>}
            
              
              <p>   <i style={{color:'orange'}}  className=' fa-solid fa-star '></i>{product.ratingsAverage}</p>
              </div>
            </div>

            
           
            </Link>
            <button onClick={()=>addProduct(product.id)} className='addBtn btn bg-main m-auto d-block'>add to cart +</button>
        </div>       } )}

      
       

       
       </div> 
  </div>






  </>
}

