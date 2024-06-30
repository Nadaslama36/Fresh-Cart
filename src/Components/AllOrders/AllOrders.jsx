import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { cartContext } from '../Context/CartContext'
import { useContext } from 'react'
export default function AllOrders() {
  
 const [allOrders, setAllOrders] = useState(null);
 

function getUserOrder () {
   
    const userId=localStorage.getItem('userId');
     console.log(userId);
      axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      
    .then((res)=>{
        console.log('res',res);
       setAllOrders(res.data);
       console.log('res',res.data);
    
    })
    .catch((err)=>{
          console.log('error',err);
    })
}
 
useEffect(() => {

  getUserOrder();
  
}, [])
  
if(!allOrders){
    return<div className=' d-flex bg-primary vh-100  bg-opacity-50 justify-content-center align-items-center'>
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
  <title>user orders</title>
 </Helmet>
    
    <div className="container">
    <div className="row gy-3 ">
        {allOrders?.map((order, idx) => {
            console.log('order', order);
            return (
                <div key={idx} className="col-md-6">
                    <div className="card  bg-light h-100">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    {order?.cartItems.map((item, secindex) => {
                                        return (
                                            <div key={secindex} className="col-md-4">
                                                <div className="card bg-body-secondary h-100">
                                                    <img
                                                        className="card-img-top w-100"
                                                        src={item.product.imageCover}
                                                        alt={item.product.title}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title text-center">
                                                            {item.product.title}
                                                        </h5>
                                                        <h6 className="card-text">Price: {item.price}</h6>
                                                        <h6 className="card-text">Count: {item.count}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <h5 className="card-title">Payment Method: {order.paymentMethodType}</h5>
                            <h5 className="card-title">Order Price: {order.totalOrderPrice}</h5>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
</div>

  
  
  
  </>
}
