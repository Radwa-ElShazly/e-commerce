// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import navbarStyles from './navbar.module.css';

const Navbar = () => {

  return (
  <div className={navbarStyles.navPage}>
<nav className="navbar navbar-expand-lg">
  <div className="container  p-2">
  <Link className="navbar-brand fw-bold fs-2 text-white" to="/">
      START FRAMEWORK
    </Link>
        <div className="collapse navbar-collapse collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
       <ul className="navbar-nav">

        <Link className={`${navbarStyles.clickElement}`} to="/about" >
          ABOUT
        </Link>

        <Link className={`${navbarStyles.clickElement}`}  to="/portfolio" >
          PORTFOLIO
        </Link>
        <Link className={`${navbarStyles.clickElement}`} to="/contact">
          CONTACT
        </Link>


      </ul>
    </div>
  </div>
</nav>
</div> 
  );
};



export default Navbar;



