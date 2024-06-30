import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
export default function SubCategoris({id,name,setLoading}) {

  const [allSubCategories, setAllSubCategories] = useState(null)
  // const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(true);

   
  async function getAllSubCategories() {
       setLoading(true);
        const res= await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`)
        .then(function(res){
            // setIsLoadingSubCategories(false);
            setLoading(false);
            setAllSubCategories(res.data.data);
           return true;
          })
          .catch(function(err){
            // setIsLoadingSubCategories(false);
          setLoading(false);
          return false
          })
         return res;
     };
       
     useEffect(() => {
        
       getAllSubCategories();
     }, [id])
     
     
   
      
      // console.log('category',data.data.data);
      return<>
      <div className="container ">
        <h2 className=' py-3 text-center text-main'>{name}</h2>
        <div className="row gy-3 m-2">
          {allSubCategories?.map((subCategory,idx)=> <div key={idx} className="col-md-4 category" >
            <div className=' card overflow-hidden'>
              <div className=' card-body  h3  text-center'>
              <h2 className=' text-black'>{subCategory.name}</h2>
             
              </div>
    
            </div>
          </div>)}
         
        </div>
      </div>
      
     
       
      </>
     
}
   






