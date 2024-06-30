import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/freshcart-logo.svg';
import { authContext } from '../Context/AuthContext';
import { cartContext } from '../Context/CartContext';
import { wishListContext } from '../Context/WishListContext';
export default function Navbar() {
const {mytoken,setToken} = useContext(authContext);
const { numOfCartItems, clearUserCart}  =  useContext(cartContext);

 const navigate=useNavigate()
function logOut (){

 
setToken(null);
localStorage.removeItem('tkn');
localStorage.removeItem('userId');
clearUserCart();


navigate('/login');

}


  return <>
<nav className="navbar navbar-expand-lg bg-body-tertiary mb-3 ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={Logo} alt="Fresh Cart" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {mytoken? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/wishlist">Wish List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AllOrders">All orders</Link>
        </li> 
       
       
      </ul>   :   ""}
  
    
     
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">



      {mytoken?  <li className="nav-item">
          <ul  className=' d-flex  list-unstyled  py-4 align-items-center'>
           <li>
            <i className=' me-2 fa-brands fa-facebook-f  '></i>
           </li>
           <li>
            <i className='  me-2 fa-brands fa-tiktok'></i>
           </li>
           <li>
            <i className=' me-2 fa-brands  fa-twitter'></i>
           </li>
           <li>
            <i className=' me-2 fa-brands  fa-linkedin-in'></i>
           </li>
           <li>
            <i className=' me-2 fa-brands fa-youtube-square'></i>
           </li>
           <li className="nav-item position-relative">
          <Link className="nav-link" to="/cart">
            <i className=' fa-solid fa-cart-shopping fa-2x '></i>
          </Link>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                   
            {numOfCartItems ? numOfCartItems  : ""}
          </span>
         </li>    
          </ul>
        </li>   :""}
       


        {mytoken? <>
        
        
          
          <li className="nav-item">
          <span onClick={logOut}  role='button' className="nav-link" >SignOut</span>
        </li> 
        
        </>
          : <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        
        </> }
       
       
      </ul>

    </div>
  </div>
</nav>
  
  
  
  
  
  </>

}