import axios from 'axios';
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react';
import { authContext } from './AuthContext';

export const cartContext= createContext();


export default function CartContextProvider({children}) {
       
    
    
    const {mytoken} = useContext(authContext);


    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allProducts, setAllProducts] = useState(null);
    const [cartID, setCartID] = useState(null);
    //  console.log('cartId',cartID);
     


     async function addProductToCart(productId) {

      try {
        const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            'productId':productId
        } ,{
            headers:{token:localStorage.getItem('tkn')}
        })
        getUserCart();
        
        ;return data;
      } catch (error) {
        return  error;
      } 
       
    }

   
   async function updateCount (id,newCount) {
      const booleanFlag= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        "count":newCount
       },{
        headers:{TOKEN:localStorage.getItem('tkn')}
       }
      ).then((res)=>{
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
      }).catch((err)=>{
        console.log('err',err);
        return false;
      })
      return booleanFlag;
   }

  async function deleteProduct(id) {
  
      const res=  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          headers:{token:localStorage.getItem('tkn')}
        
        })  .then((res)=>{
          setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
        }).catch((err)=>{
          console.log('err',err);
          return false;
        })
        return res;
   }

   async  function clearUserCart() {
    const res=  await  axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers:{token:localStorage.getItem('tkn')}
      }).then((res)=>{
        setAllProducts([]);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        return true;
      }).catch((err)=>{
        console.log('err',err);
        return false;
      })
         return res;
   }




    function getUserCart() {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{token:localStorage.getItem('tkn')}
        })
        .then((res)=>{
        console.log('res',res.data.data);
        setAllProducts(res.data.data.products);
        setCartID(res.data.data._id);
        localStorage.setItem('userId',res.data.data.cartOwner); 
        setNumOfCartItems(res?.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        
        })
        .catch((err)=>{
            console.log('err',err);
        })
      }

     

    useEffect(()=>{
        getUserCart();

    },[mytoken])


  
  return <cartContext.Provider value={{
    addProductToCart ,
    numOfCartItems,
  totalCartPrice,
  allProducts,
  getUserCart,
  updateCount,
  deleteProduct,
  clearUserCart,
  cartID,
  }}>
  
  
  
  
  {children}
  
  
  </cartContext.Provider>
}

