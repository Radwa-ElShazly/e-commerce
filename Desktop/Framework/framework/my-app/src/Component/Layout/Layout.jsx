import React, { Component } from 'react';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';


class Layout extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Outlet/>
                <Footer/>
            </div>
        );
    }
}

export default Layout;