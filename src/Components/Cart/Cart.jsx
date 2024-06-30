import React, { useContext, useState } from 'react'
import { cartContext } from '../Context/CartContext'
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Cart() {

const {updateCount, totalCartPrice, allProducts, deleteProduct, clearUserCart}=useContext(cartContext);
 


 async  function updateMyProductCount(id,newCount) {
    const res=   await updateCount(id,newCount);
    if (res) {
      toast.success('product added successfully.',{position:"top-right"})
    }
    else{
   toast.error('error occured.',{position:'top-right'})
    }
  }

 async function deleteMyProductCount(id,newCount) {
   const res=await updateCount(id,newCount);
   if (res) {
    toast.success('product removed successfully.',{position:"top-right"})
  }
  else{
 toast.error('error occured.',{position:'top-right'})
  }
  }

 async function myDeletedCartItem(id) {
   const res=  await deleteProduct(id);
   if (res) {
    toast.success('product removed successfully',{position:'top-center'})
   }
   else{
    toast.error('error occured',{position:'top-center'})
   }
  }


  if (!allProducts) {
    return <div className=' d-flex bg-primary vh-100  bg-opacity-50 justify-content-center align-items-center'>
        <FallingLines
        color="#fff"
        width="100"
        visible={true}
         ariaLabel="falling-circles-loading"
         />
        </div> 
  }




  return<>

 <Helmet>
  <title>user cart</title>
 </Helmet>


  {allProducts.length?<div className="container  bg-light py-3 overflow-hidden">
        <div  className=' d-flex justify-content-between'>
        <div >
        <h2 >Shop Cart:</h2>
        <p>Total Cart Price:{totalCartPrice} LE</p>
        </div>
         <div className=' d-flex flex-column-reverse justify-content-around' >
        <Link  to='/onlinePayment' >
        <button   className=' btn  btn-outline-secondary'>Confirm Payment</button>
        </Link>
         </div>
        </div>
      
          
          <button onClick={clearUserCart}   className=' btn btn-danger'>clear Cart</button>
        {allProducts.map((product,idx)=><div  key={idx} className="row py-3  border-1 border-bottom border-secondary">
           <div className="col-md-1 d-flex align-items-center">
           <div>
           <img  className=' w-100' src={product.product.imageCover} alt={product.product.title}/>
           </div>
           </div>

           <div className="col-md-9">
           <div>
           <h4>{product.product.title}</h4>
            <h5>{product.price}</h5>
            {/* <br />
            1.{product._id} 
            <br />
            2.{product.product.id}
            <br />  */}
            <button onClick={()=>myDeletedCartItem(product.product.id)}  className=' btn btn-danger'>Remove</button>
           </div>
           </div>

            <div className="col-md-2  ">
              <div  className='  d-flex  justify-content-between  py-3'>
              <button onClick={()=>updateMyProductCount(product.product.id,product.count+1)}     className=' btn btn-outline-success'>+</button>
              <p>{product.count}</p>
              
              <button   disabled={product.count==1} onClick={()=>deleteMyProductCount(product.product.id,product.count-1)}    className=' btn btn-outline-success'>-</button>
              </div>
            </div>
        </div>)}
       
  </div>  :  <div className=' text-center'>
 <h2> cart is empty</h2>
 <Link    role='button'  className=' btn btn-danger rounded-5 m-3'   to= '/home'>  return to home page   </Link>

 </div>  }

  

  </>
}

