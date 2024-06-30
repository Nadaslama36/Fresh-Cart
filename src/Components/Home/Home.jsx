import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import SimpleSlider from '../HomeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { wishListContext } from '../Context/WishListContext'
import { Button } from 'bootstrap'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'
import { Helmet } from 'react-helmet'
 export default function Home() {
  // const [allProducts, setAllProducts] = useState(null)
  const {addProductToWishList,deleteProduct,}=useContext(wishListContext); 
 const {addProductToCart}= useContext(cartContext);
 const [search, setSearch] = useState("");
 const [wishList, setWishList] = useState([]);

 const [loading, setLoading] = useState(false);


 async function addProduct(id) {
  setLoading(true);
  const res= await addProductToCart(id)
  if (res){
   toast.success('product added to your cart',{position:'top-center',style:{backgroundColor:'cyan'}});
   
  }
  else{
    toast.error('error occured',{position:'top-center',style:{backgroundColor:'darkgreen',color:'black'}})
  }
  setLoading(false);
 } 




 async function addWish(id) {
 setLoading(true);
  const res= await  addProductToWishList(id)
  if (res){
   
   toast.success('product added Successfully',{position:'top-center',style:{backgroundColor:'cyan'}});
   setWishList(prevState => {
    const updatedWishList = {...prevState, [id]: true};
    localStorage.setItem('wishlist', JSON.stringify(updatedWishList));
    return updatedWishList;
  });
   

  }
  else{
    toast.error('error occured',{position:'top-center',style:{backgroundColor:'darkgreen',color:'black'}});
    
  }
  setLoading(false);
 } 
  
 
 async function myDeletedWishItem(id) {
  setLoading(true);
  const res = await deleteProduct(id);
  if (res) {
    toast.success('product removed successfully', {position:'top-center'});
    setWishList(prevWishList => {
      const newWishList = {...prevWishList};
      delete newWishList[id];
      return newWishList;
  });
  } else {
    toast.error('error occured', {position:'top-center'});
  }
  setLoading(false);
}

 async function getAllProducts(){
 
  return  await axios.get('https://ecommerce.routemisr.com/api/v1/products');
   
  };

 const { error,isLoading,data,isFetching}= useQuery('getAllProducts',getAllProducts);
 
 
 useEffect(() => {
  
  const storedWishList = localStorage.getItem('wishlist');
  if (storedWishList) {
    setWishList(JSON.parse(storedWishList));
  }
  
}, []);
useEffect(() => {
  localStorage.setItem('wishlist', JSON.stringify(wishList));
}, [wishList]);


 
   return<>
  <Helmet>
  <title>FreshCart</title>
 </Helmet>
  
       <div className="container position-relative">
 
        <div className="row  g-0 my-5">
     <div className="col-md-8">
       <SimpleSlider />
     </div>
     <div className="col-md-4">
       <div>
       <img   style={{height:"150px" }} src={require('../../images/grocery-banner.png')}alt="" />
       </div>
       <div>
       <img   style={{height:"150px" }}src={require('../../images/grocery-banner-2.jpeg')}alt="" />
       </div>
     </div>
  
       </div>
        <h2>shop popular categories</h2>
        <CategorySlider />
         <br />
          <br />
        <div className="  w-50 m-auto ">
         <div className=' input '>
         <input    type="search" className=' form-control' placeholder='Search' onChange={(e)=>setSearch(e.target.value)} />
 
           </div> 
        </div>
        <div className=" products row mt-3 gy-3 ">
       
        {data?.data.data.filter((product)=>{
         if(search===""){
          return product
         }
         else if(product.title.split(' ').slice(0,2).join(' ').toLowerCase().includes(search.toLowerCase())){
           return product
         }
        })  
        .map((product,idx)=> {return <div key={idx} className="col-md-2  overflow-hidden">
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
             
             <button onClick={() => {
    if (wishList[product.id]) {
        myDeletedWishItem(product.id);
    } else {
        addWish(product.id);
    }
}} style={{border:'none',backgroundColor:'transparent'}}>
    <i style={{color: wishList[product.id] ? 'red' : 'black'}} className='fa-solid fa-heart fa-2xl'></i>
</button>

             <button onClick={()=>addProduct(product.id)} className='addBtn btn bg-main m-auto d-block'>add to cart +</button>
             
         </div>  } )}
 
       
        
        
        
        </div> 
        {loading && <LoadingOverlay />}
     </div>    
      
   
 
 
     
   </>

  
 }





