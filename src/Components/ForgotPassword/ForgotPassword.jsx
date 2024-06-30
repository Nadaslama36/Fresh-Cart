import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
export default function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [email, setEmail] = useState('');
    const navigate=useNavigate();
    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
            {email});
            console.log(response.data);
            setLoading(false);
            alert('Please check your email for further instructions.');
            setIsSuccess(true);
            setTimeout(function(){
               setIsSuccess(false);navigate('/verifyResetCode')
               }
               ,2000);
        } catch (error) {
            setLoading(false);
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };


  return <>
   <div  className='w-75 m-auto p-5 '>
            <h1>Forgot Password:</h1>
            <input className=' form-control'
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /> 
            <button onClick={handleForgotPassword} className='bg-main btn p-2 text-white'>
            {loading?<ColorRing
            visible={true}
             height="30"
           width="30"
            ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
             colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />: " submit "}
       
            </button>

        </div>
  
  
  
  
  
  
  
  
  </>
}
