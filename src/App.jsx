import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Layout from './Pages/Layout/Layout'
import Product from './Pages/Product/Product'
import NotFound from './Pages/NotFound/NotFound'
import Home from './Pages/Home/Home'
import Categories from './Pages/Categories/Categories'
import Cart from './Pages/Cart/Cart'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Brands from './Pages/Brands/Brands'
import WishList from './Pages/WishList/WishList'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './Context/AuthContext'
import CartContextProvider from './Context/CartContext'
import WishListContextProvider from './Context/WishListContext'
import Payment from './Pages/Payment/Payment'
import AllOrders from './Pages/AllOrders/AllOrders'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'
import VerifyCode from './Pages/VerifyCode/VerifyCode'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import { Offline } from 'react-detect-offline'


const myRouter =createBrowserRouter([
  {path:'/',element:<Layout/>, children:[
   { index:true,element:<Home/> },  
    { path:'e-commerce',element:<Home/> },
   { path:'register',element:<Register/> },
   { path:'login',element:<Login/> },
   { path:'forgetPassword',element:<ForgetPassword/> },
   { path:'verify-code',element:<VerifyCode/> },
   { path:'reset-password',element:<ResetPassword/> },
   { path:'product',element:<ProtectedRoute> <Product/>  </ProtectedRoute>},
   { path:'wishList',element:<ProtectedRoute> <WishList/>  </ProtectedRoute>},
   { path:'productDetails/:id/:category',element:<ProtectedRoute> <ProductDetails/>  </ProtectedRoute>},
   { path:'home',element:<ProtectedRoute> <Home/></ProtectedRoute>  },
   { path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute> },
   { path:'cart',element:<ProtectedRoute> <Cart/> </ProtectedRoute> },
   { path:'payment',element:<ProtectedRoute> <Payment/> </ProtectedRoute> },
   { path:'allorders',element:<ProtectedRoute> <AllOrders/> </ProtectedRoute> },
   { path:'brands',element:<ProtectedRoute> <Brands/> </ProtectedRoute> },
   { path:'*',element:<NotFound/> },
  ]},
])


export default function App() {
  const myClient = new QueryClient();
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
    <Toaster/>
    <Offline>
       <div className="bg-dark fixed-bottom text-white py-3"> Your Internent connection has been Corrupted</div>
    </Offline>
</>
}
