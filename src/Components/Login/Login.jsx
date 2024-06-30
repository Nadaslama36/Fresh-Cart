import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import  * as yup from 'yup';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import { wishListContext } from '../Context/WishListContext';
import { Helmet } from 'react-helmet';

const mySchema=yup.object({
  
  email:yup.string().required('email is required').email(),
  password: yup.string().required('password is required ') .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'Must be start with a letter (either uppercase or lowercase),Be between 5 and 8 characters in total,Can only contain letters (A-Z or a-z) and numbers (0-9)'),
  
 
})


export default function Login() {
const [isLoading, setIsLoading] = useState(false)
 const [isSuccess, setIsSuccess] = useState(false)
 const [errorMessage, setErrorMessage] = useState(undefined)
 
  const navigate=useNavigate();
 const {setToken,getUserData} = useContext(authContext);
 const {  getUserWishList} = useContext(wishListContext);
const{getUserCart} =useContext(cartContext);
 

 function mySubmit(values){

  console.log('submited..',values);
   setIsLoading(true)
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
  .then(function(x){
   if(x.data.message=='success'){
     console.log('Token:',x.data.token);
    localStorage.setItem('tkn',x.data.token);
    localStorage.setItem('email',x.data.email);
    getUserWishList();
    getUserCart();
     setToken(x.data.token);
     getUserData();
     setIsLoading(false);
    setIsSuccess(true);
    setTimeout(function(){
      setIsSuccess(false);navigate('/Products')
    },2000);
   }
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
   email:'',
   password: '',
 })

 const myFormik =useFormik({
    initialValues:  userData  ,  
    onSubmit : mySubmit,
   
   validationSchema :mySchema,

})





  return <>
  <Helmet>
  <title>Login</title>
 </Helmet>
  
  
  <div className=' w-75 m-auto p-5  form-box ' style={{backgroundColor:"#4bcffa"}}>
     
  
   {isSuccess?<div className=' alert alert-success text-center'>Welcome back ♥</div>:""}
   {errorMessage?<div className=' alert alert-danger text-center'>{errorMessage}</div>:""}
   
   

    <h2>Login Now:</h2>
    <form onSubmit={myFormik.handleSubmit} >
    
      <label htmlFor="email">email:</label>
      <input  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id="email" type="email" placeholder='email' className=' form-control mb-2' />
       {myFormik.errors.email  && myFormik.touched.email?  <div className=' alert alert-danger'>{myFormik.errors.email}</div>:""}

      <label htmlFor="password">password:</label>
      <input onBlur={myFormik.handleBlur}    onChange={myFormik.handleChange}  value={myFormik.values.password}id="password" type="password" placeholder='password' className=' form-control mb-2' />
      {myFormik.errors.password  && myFormik.touched.password?  <div className=' alert alert-danger'>{myFormik.errors.password}</div>:""}
   
      <button type='submit' className='bg-main btn p-2 text-white '>


        {isLoading?<ColorRing
        visible={true}
         height="30"
           width="30"
            ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
             colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />: " Login "}
       
        
        
        </button>
        <Link to="/forgotPassword">Forgot Password?</Link>


    </form>

  </div>
  
  
  </>
}