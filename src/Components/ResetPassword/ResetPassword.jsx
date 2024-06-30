import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ResetPassword() {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
 const navigate= useNavigate();
    const handleResetPassword = async () => {
      try {
        setLoading(true);
        // Assuming the API endpoint accepts both email and new password
        const response = await axios.put(
          ' https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
          { email, newPassword }
        );
        setLoading(false);
        console.log(response.data); // Handle the response as needed
        alert('Password reset successful! You can now log in with your new password.');
        setIsSuccess(true);
        setTimeout(function(){
            setIsSuccess(false);navigate('/home')
            }
            ,2000);
      } catch (error) {
        setLoading(false);
        console.error(error);
        alert('An error occurred. Please try again.');
      }
    };


  return <>
  <div>
      <h1>Password Reset</h1>
      <input className=' form-control'
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className=' form-control'
        type="password"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      
      <button onClick={handleResetPassword} disabled={loading}>
        {loading ? 'Updating...' : 'Reset Password'}
      </button>
      {isSuccess && <p>Password reset successful! Redirecting to login...</p>}



    </div>
  </>
}
