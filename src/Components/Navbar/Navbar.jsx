import React, { useContext } from 'react'
import logo  from '../../images/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'
import { cartContext } from '../../Context/CartContext';
export default function Navbar() {
  const {token, setToken} = useContext(authContext);
  const {numOfCartItems} =useContext(cartContext)

const navigate= useNavigate();

const logout = ()=>{
   setToken(null);
   localStorage.removeItem('tkn');
   navigate('/login')
}


return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
  <div className="container-fluid px-5">
    <Link className="navbar-brand" to="#">
     <img src={logo} alt="Fresh Cart" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse ms-xl-5 ps-xl-5 ms-0 ps-0" id="navbarSupportedContent">


{token? <ul className="navbar-nav mb-2 mb-lg-0 m-xl-auto ">
  
        <li className="nav-item ps-xl-3 ms-0 ps-0 ">
          <Link className="nav-link active ms-xxl-5 ps-xxl-5 ps-xl-0" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>        
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">AllOrders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/product">Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishList">WishList</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>        
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>         
      </ul>:''}




      <ul className="navbar-nav mb-2 mb-lg-0 ms-auto mt-lg-0 mt-sm-1">
      <li className="nav-item ">
          <ul className='list-unstyled d-flex align-items-center pt-2'>
            <li>
                <i className="cursor-pointer fa-brands fa-instagram me-3 text-light-emphasis"></i>

            </li>

            <li>
                   <i className="cursor-pointer fa-brands fa-facebook me-2 ms-1 text-light-emphasis"></i>
            </li>

            <li>
                 <i className="cursor-pointer fa-brands fa-tiktok me-2 ms-1 text-light-emphasis"></i>
            </li>

            <li>
                  <i className="cursor-pointer fa-brands fa-twitter me-2 ms-1 text-light-emphasis"></i>
            </li>

            <li>
                   <i className="cursor-pointer fa-brands fa-linkedin me-2 ms-1 text-light-emphasis"></i>
            </li>

            <li>
                     <i className="cursor-pointer fa-brands fa-youtube  me-2 ms-1 text-light-emphasis"></i>
            </li>

          </ul>
        </li>   

       {token?  <>    

       <div className="d-flex pe-md-5 pt-md-1 ps-lg-3">
          <li className="nav-item position-relative ps-lg-2 pe-lg-0  mt-lg-0 pt-2 mt-md-3 mt-4 pe-md-5  pe-3  ps-0">
            <Link to={'/cart'}>  <i className="fa-solid fa-cart-plus fs-5 text-light-emphasis"></i> </Link>
          <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-main cursor-pointer">
                 {numOfCartItems ? numOfCartItems:0}
            </span>
          </li>


           <li className="nav-item mt-lg-0 pt-lg-0 ms-md-0  mt-md-2 pt-md-1 mt-2 pt-2 ms-4 ps-2">      
          <Link  role='button' onClick={logout} className="nav-link" to={"/login"} >SignOut</Link >
        </li>
       </div>



       </>
 : <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>        
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        </>       
        }




      </ul>

    </div>
  </div>
</nav>
  </>
}
