import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
export default function ResetCode() {
    const [resetCode, setResetCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
   const navigate= useNavigate()
    const handleResetCode = async () => {
        try {
            setLoading(true);
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{resetCode});
            setLoading(false);
            console.log(response.data);
            alert('Code verified. You may now reset your password.');
            setIsSuccess(true);
            setTimeout(function(){
                setIsSuccess(false);navigate('/resetPassword')
                }
                ,2000);
        } catch (error) {
            setLoading(false);
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };

  return <>
   <div className=' container form-box' style={{backgroundColor:"#4bcffa"}}>
            <h1>Verify Reset Code</h1>
            <input className=' form-control'
                type="text"
                placeholder="Enter the verification code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
            />
             <button onClick={handleResetCode} className='bg-main btn p-2 text-white'>
            {loading?<ColorRing
            visible={true}
             height="30"
           width="30"
            ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
             colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />: " verify "}
       
            </button>
        </div>
  
  
  
  
  
  
  </>
}
