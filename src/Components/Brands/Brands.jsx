import React from 'react'
import { useQuery } from 'react-query';
import { FallingLines } from 'react-loader-spinner';
import axios from 'axios';
import { Helmet } from 'react-helmet';
export default function Brands() {

    async function getAllBrands() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      
     };
      
     const { error,isLoading,data}= useQuery('getAllBrands',getAllBrands);
     
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
  <title>Brands</title>
 </Helmet>
  
  <div className="container">
    <h1 className=' text-center m-4' style={{color:'#3ae374'}}>All Brands</h1>
    <div className="row gy-3 m-3">
        {data.data.data.map((brand,idx)=><div key={idx}  className="col-md-3 brands">
            <div className=' card overflow-hidden'>
              <div className=' card-img'>
                <img src={brand.image} alt={brand.name} />
              </div>
              <div className='  card-body'>
                <h2>{brand.name}</h2>
              </div>
            </div>
        </div>)}
        
    </div>
  </div>
  
  
  
  
  </>
}
