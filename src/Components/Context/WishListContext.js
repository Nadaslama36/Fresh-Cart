import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { authContext } from "./AuthContext";
import React from 'react';
import { useEffect } from "react";
import { FallingLines } from "react-loader-spinner";

export const wishListContext=createContext();

export default function WishListContextProvider({children}) {

    const {mytoken} = useContext(authContext);

    const [allProducts, setAllProducts] = useState(null);
   
    const [wishList, setWishList] = useState({});

    const addWish = (id) => {
      setWishList({ ...wishList, [id]: true });
    };
  
    const removeWish = (id) => {
      const newWishList = { ...wishList };
      delete newWishList[id];
      setWishList(newWishList);
    };

     async function addProductToWishList(productId) {
  

      try {
       
        const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
            'productId':productId
        } ,{
            headers:{token:localStorage.getItem('tkn')}
        })    
        ;  getUserWishList();
           
        return data;
        
        console.log( );}
     
      catch (error) {
        
        return  error;}
      
       
    }
    
    function getUserWishList() {
      axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
          headers:{token:localStorage.getItem('tkn')}
      })
      .then((res)=>{
      // console.log('res',res.data.data);
      setAllProducts(res?.data.data);
      console.log('res',res.data.data);
     
     
      
      })
      .catch((err)=>{
          console.log('err',err);
      })
    }
    
    async function deleteProduct(id) {
      let res;
      try {
          res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
              headers:{token:localStorage.getItem('tkn')}
          });
          setAllProducts(res?.data.data);
      } catch (err) {
          console.log('Error deleting product:', err);
      } finally {
          // Ensure rendering happens even if an error occurs
          getUserWishList();
      }
      return res;
  }
  


  //   async function deleteProduct(id) {
  //     const res=  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
  //         headers:{token:localStorage.getItem('tkn')}
  //       }).then((res) => {
  //         setAllProducts(res?.data.data);
  //         return true;
  //     }).catch((err) => {
  //         console.log('err', err);
  //         return false;
  //     })
  //     return res;
  //  }









  useEffect(()=>{
    const storedWishList = localStorage.getItem('wishlist');
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
      getUserWishList();
     
  },[mytoken])
  


  return <wishListContext.Provider value={{
    addProductToWishList,
    getUserWishList,
    deleteProduct,
    allProducts,
    wishList,
     addWish,
     removeWish,
    
    
  }}>
  
  
  
  
  
  {children}
  
  
  
  
  
  </wishListContext.Provider>
}
