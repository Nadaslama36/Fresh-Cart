import React from 'react'

export default function Footer() {
  return <>
  <footer className=' bg-light mt-4'>
  <div>
    <h1>Get the FreshCart app</h1>
    <p style={{color:'gray'}}>we will send you a link,open it on your phone to download the app.</p>
  </div>
  <div className=' container d-flex  pb-5'>
  <input type="email" className=' form-control w-75' placeholder='email'/>
  <button type=' submit' className=' bg-main btn p-2 text-white m-auto  '>
    Share App Link
  </button>
  </div>
  </footer>
  
  
  
  
  </>
}
