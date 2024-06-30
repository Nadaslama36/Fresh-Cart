import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { FallingLines } from 'react-loader-spinner'
import SubCategoris from '../SubCategories/SubCategoris'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'
import { Helmet } from 'react-helmet'
export default function Categories() {
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);


 async function getAllCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  
 };
  
 const { error,isLoading,data}= useQuery('getAllCategories',getAllCategories);
 
 if (isLoading ) { 
  return  <div className=' d-flex bg-primary vh-100  bg-opacity-50 justify-content-center align-items-center'>
    <FallingLines
      color="#fff"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  </div>
}
  
  // console.log('category',data.data.data);
  return<>
  <Helmet>
  <title>Categories</title>
 </Helmet>
  <div className="container  position-relative ">
    <div className="row gy-3 m-5 ">
      {data?.data.data.map((category,idx)=> <div key={idx} className="col-md-4 category" onClick={() =>{setSelectedCategory(category);
      setLoading(true);}}>
        <div className=' card overflow-hidden'>
          <div className='card-img'>
          <img className=' w-100' style={{height:"350px" }} src={category.image} alt={category?.name} />
          </div>
          <div className=' card-body'>
          <h2>{category.name}</h2>
          </div>

        </div>
      </div>)}
     
    </div>
  </div>
  {selectedCategory && <SubCategoris id={selectedCategory._id}  name={selectedCategory.name} setLoading={setLoading}/>}
  {loading && <LoadingOverlay />}
 
   
  </>
}
