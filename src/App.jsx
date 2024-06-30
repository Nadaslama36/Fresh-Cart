import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import { AuthContextProvider} from './Components/Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import Categories from './Components/Categories/Categories'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Components/Context/CartContext'
import Cart from './Components/Cart/Cart'
import { Toaster,ToastBar } from 'react-hot-toast'
import OnlinePayment from './Components/Payment/OnlinePayment'
import AllOrders from './Components/AllOrders/AllOrders'
import { Offline } from 'react-detect-offline'
import Brands from './Components/Brands/Brands'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import WishList from './Components/WishList/WishList'
import WishListContextProvider from './Components/Context/WishListContext'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'




 const myRouter=createHashRouter([
  {path:   '/'   ,element: <Layout /> ,children:[
    
   {index:true,element:<Register />},
   {path:'register',element:<Register />},
   {path:'login',element:<Login />},
   {path:'forgotPassword',element:<ForgotPassword />},
   {path:'verifyResetCode',element:<ResetCode/>},
   {path:'resetPassword',element:<ResetPassword/>},
   {path:'home',element:<ProtectedRoute>
    <Home />
   </ProtectedRoute>},
   {path:'productDetails/:id',element:<ProtectedRoute>
    <ProductDetails/>
   </ProtectedRoute>},
   {path:'categories',element:<ProtectedRoute>
    <Categories /> 
   </ProtectedRoute>},
   {path:'cart',element:<ProtectedRoute>
    <Cart />
   </ProtectedRoute>},
   {path:'onlinePayment',element:<ProtectedRoute>
    <OnlinePayment />
   </ProtectedRoute>},
   {path:'AllOrders',element:<ProtectedRoute>
    <AllOrders />
   </ProtectedRoute>},   
   {path:'brands',element:<ProtectedRoute>
    <Brands />
   </ProtectedRoute>},
   {path:'products',element:<ProtectedRoute>
    <Products />
   </ProtectedRoute>},
   {path:'wishlist',element:<ProtectedRoute>
    <WishList />
   </ProtectedRoute>},


 
   

   {path:'*',element:<NotFound />},

  ] },
])
  


 
export default function App() {

const myClient= new QueryClient();


  return <>
  
  <QueryClientProvider client={myClient}>
  <AuthContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
      <RouterProvider router={myRouter} />
      </WishListContextProvider>
     </CartContextProvider>
  </AuthContextProvider>
  </QueryClientProvider>

 
  
  <Toaster />
   
   <Offline>
    <div className=' bg bg-dark fixed-bottom text-white'>your internet connection has been corrupted</div>
   </Offline>
    
   
  
  
  </>
}

