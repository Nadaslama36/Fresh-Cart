import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import  * as yup from 'yup';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


var passwordRegex=/^[A-Za-z][A-Za-z0-9]{5,8}$/;
var phoneRegex=/^01[0125][0-9]{8}$/;
const mySchema=yup.object({
  name:yup.string().required('Name is required.').min(3,'at least 3 characters').max(10,'at most 10 characters'),
  email:yup.string().required('email is required').email(),
  password: yup.string().required('password is required ') .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'Must be start with a letter (either uppercase or lowercase),Be between 5 and 8 characters in total,Can only contain letters (A-Z or a-z) and numbers (0-9)'),
  rePassword: yup.string().oneOf([yup.ref('password'),null],'password must match').required('password is required ')  ,
  phone: yup.string().required('phone is required').matches(phoneRegex,'phone is invalid'),
    
})


  

export default function Register() {
const [isLoading, setIsLoading] = useState(false)
 const [isSuccess, setIsSuccess] = useState(false)
 const [errorMessage, setErrorMessage] = useState("")
 
  const navigate=useNavigate();


 

 function mySubmit(values){

  console.log('submited..',values);
   setIsLoading(true)
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
  .then(function(x){
    console.log('in case of success:x',x);
    setIsLoading(false);
    setIsSuccess(true)
    setTimeout(function(){
      setIsSuccess(false);navigate('/Login')
    },2000);
  })
  .catch(function(x){
    // console.log('in case of error:x',x.response.data.message);
    setIsLoading(false);
    setErrorMessage(x.response.data.message);
    setTimeout(function () {
      setErrorMessage(undefined) }, 2000  )
  })


  // try{
  //   const res=  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
  //   console.log('success',res.data);
  // }
  // catch(err){
  //   console.log('error',err);
  // }

 }
  

  const userData=({
   name:'',
   email:'',
   password: '',
   rePassword: '',
   phone: '',
 })

 const myFormik =useFormik({
    initialValues:  userData  ,  
    onSubmit : mySubmit,
   
   validationSchema :mySchema,

})





  return <>
  <Helmet>
  <title>Register</title>
 </Helmet>
  
  
  <div className=' w-75 m-auto p-5 form-box ' style={{backgroundColor:"#4bcffa"}}>
     
  
   {isSuccess?<div className=' alert alert-success text-center'>congratulations your account has been created</div>:""}
   {errorMessage?<div className=' alert alert-danger text-center'>{errorMessage}</div>:""}
   
   

    <h2>Register Now:</h2>
    <form onSubmit={myFormik.handleSubmit} >
      <label htmlFor="name">name:</label> 
      <input  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name}id="name" type="text" placeholder='name' className=' form-control mb-2' />
           {myFormik.errors.name  && myFormik.touched.name?  <div className=' alert alert-danger'>{myFormik.errors.name}</div>:""}

      <label htmlFor="email">email:</label>
      <input  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id="email" type="email" placeholder='email' className=' form-control mb-2' />
       {myFormik.errors.email  && myFormik.touched.email?  <div className=' alert alert-danger'>{myFormik.errors.email}</div>:""}

      <label htmlFor="password">password:</label>
      <input onBlur={myFormik.handleBlur}    onChange={myFormik.handleChange}  value={myFormik.values.password}id="password" type="password" placeholder='password' className=' form-control mb-2' />
      {myFormik.errors.password  && myFormik.touched.password?  <div className=' alert alert-danger'>{myFormik.errors.password}</div>:""}

      <label htmlFor="rePassword">rePassword:</label>
      <input  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange}  value={myFormik.values.rePassword} id="rePassword" type="password" placeholder='rePassword' className=' form-control mb-2' />
      {myFormik.errors.rePassword  && myFormik.touched.rePassword?  <div className=' alert alert-danger'>{myFormik.errors.rePassword}</div>:""}

      <label htmlFor="phone">phone:</label>
      <input  onBlur={myFormik.handleBlur}   onChange={myFormik.handleChange}  value={myFormik.values.phone}id="phone" type="text" placeholder='phone' className=' form-control mb-2' />
      {myFormik.errors.phone  && myFormik.touched.phone?  <div className=' alert alert-danger'>{myFormik.errors.phone}</div>:""}



      <button type='submit' className='bg-main btn p-2 text-white '>


        {isLoading?<ColorRing
        visible={true}
         height="30"
           width="30"
            ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
             colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />: " Register"}
       
        
        
        </button>
  


    </form>

  </div>
  
  
  </>
}
