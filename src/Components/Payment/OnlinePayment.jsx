import React from 'react'
import { useFormik } from 'formik'
import { cartContext } from '../Context/CartContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import * as Yup from "yup";
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
export default function OnlinePayment() {

  //   const {cartID} = useContext(cartContext);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const {clearUserCart} = useContext(cartContext)
   
      
   
      
  //  var cityRegex=/^[a-zA-Z\s]+$/;
  //  var phoneRegex=/^01[0125][0-9]{8}$/;
  //  const mySchema=yup.object({
  //  city:yup.string().required('city is required').matches(cityRegex,'city is invalid'),
   
  //  details :yup.string().required('details is required'),
   
  //  phone: yup.string().required('phone is required').matches(phoneRegex,'phone is invalid'),
   
  //  })
   

  //  function mySubmit(values) {
  //    setIsLoading(true);
  //      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?`,values,{
  //          headers:{token:localStorage.getItem('tkn')},
  //          params:{url:'http://localhost:3000'},
  //      }).then((res)=>{
  //        console.log(res.data);
  //          if (res.data.status==="success") {
  //           window.open(res.data.session.url,"_self")
            
            
  //          }
  //      }).catch((err)=>{
  //        console.log('err',err);
  //        setIsLoading(false);
  //        toast.error('Error',{position:'top-center'})
  //      })
  //   }
  const [errorMsg, setErrorMsg]= useState("")
  const[isLoading, setIsLoading]= useState(false)
const {cartId}= useParams()

const validationSchema= Yup.object({
  details: Yup.string().required("Details is required"),
  city: Yup.string().required("City is required"),
  phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter valid Egyptian phone number")
})

async function onSubmit(values) {
  setErrorMsg("")
  try {
    setIsLoading(true)
    const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}`, {
      shippingAddress: values
    },{
      headers:{
          token: localStorage.getItem("token")
      },
      params: {
       url: "http://localhost:3000"
      }
    })
  window.open(data.session.url, "_self")
   } catch (error) {
    setErrorMsg(error.response.data.message)

   }
   setIsLoading(false)
}
   
    const userData=({
       city:'',
       phone: '',
       details:'',
     })
      
   
     const myFormik =useFormik({
       initialValues:  userData  ,  
       onSubmit,
       validationSchema 
      
   
   })
   
  return <>
  <Helmet>
  <title>Payment</title>
 </Helmet>
 {isLoading ?
            <>
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            </>
            :
    <>
  <div className='container w-50 m-auto form-box' style={{backgroundColor:"#dcdde1"}} > 
    <form onSubmit={myFormik.handleSubmit}  className=' p-3'>
        <label htmlFor="city">City:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.city} type="text" placeholder='city....'   id='city' className=' form-control mb-2'     />
        {myFormik.errors.city  && myFormik.touched.city?  <div className=' alert alert-danger'>{myFormik.errors.city}</div>:""}

        <label htmlFor="phone">phone:</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} type="text" placeholder='phone....'   id='phone' className=' form-control mb-2'     />
        {myFormik.errors.phone && myFormik.touched.phone?  <div className=' alert alert-danger'>{myFormik.errors.phone}</div>:""}

        
        <label htmlFor="details">Details:</label>
        <textarea onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.details} type="text" placeholder='details....'   id='details' className=' form-control mb-2'></textarea >
        {myFormik.errors.details && myFormik.touched.details?  <div className=' alert alert-danger'>{myFormik.errors.details}</div>:""}

      <button  type='submit' className=' btn btn-primary mb-2'>
        
      {isLoading?<ColorRing
        visible={true}
         height="30"
           width="30"
            ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
             colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />: " Confirm online Payment "}
       
        
        
        
        
        
        
        </button>
    </form>
   </div>
   </>}
  
  
  
  
  
  
  
  
  
  
  
  </>
}
