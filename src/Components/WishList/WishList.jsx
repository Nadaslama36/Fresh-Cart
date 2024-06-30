import React from 'react'
import { wishListContext } from '../Context/WishListContext'
import { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FallingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'


export default function WishList() {

  
  const {allProducts,deleteProduct,removeWish} = useContext(wishListContext);
  const {addProductToCart}= useContext(cartContext);
  const [loading, setLoading] = useState(false);
 console.log('www',allProducts);

  async function addProduct(id) {
    setLoading(true);
    const res= await addProductToCart(id)
    if (res){
     toast.success('product added to your cart',{position:'top-center',style:{backgroundColor:'cyan'}});
     myDeletedWishItem(id);
    }
    else{
      toast.error('error occured',{position:'top-center',style:{backgroundColor:'darkgreen',color:'black'}})
    }
    setLoading(false);
   } 

   

   async function myDeletedWishItem(id) {
    setLoading(true);
    const res=  await deleteProduct(id);
    if (res) {
      
     toast.success('product removed successfully',{position:'top-center'});
     removeWish(id); 
    }
    else{
     toast.error('error occured',{position:'top-center'})
    }
    setLoading(false);
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
  <title>user WishList</title>
 </Helmet>
 {allProducts?.length?<div className="container bg-light   {loading && <LoadingOverlay />}py-3 overflow-hidden">
   <div>
   <h1>My Wish List</h1>
   </div>

  
    {allProducts?.map((product,idx)=><div key={idx}  className="row py-3 align-items-center border-1 border-bottom border-secondary">
        <div className="col-md-1 d-flex align-items-center">
        <div>
           <img  className=' w-100' src={product.imageCover} alt={product.title}/>
           </div>
        </div>
        <div className="col-md-9">
       <div >
       <h4>{product.title}</h4>
        <button  onClick={() => myDeletedWishItem(product.id)} 
        className=' btn btn-danger'>Remove</button>
        {/* <h1>{product._id}</h1> */}
        </div>
       </div>
        <div className="col-md-2">
        <div  className='  py-3 d-flex justify-content-end '>
        <button onClick={()=>addProduct(product.id)} className='btn bg-main'>add to cart +</button>
       </div>
     
        </div>
       
    </div>)}
    
  </div>  :<div className=' text-center'>
 <h2> wishList is empty</h2>
 <Link role='button'  className=' btn btn-danger rounded-5 m-3'to= '/home'>  return to home page</Link>

 </div> }





 {loading && <LoadingOverlay />}
  
 
  
  
  
  </>
}
