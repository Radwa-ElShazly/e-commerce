import React, { Component } from 'react';
import profileImage  from '../../image/avataaars.svg'
import profile from './home.module.css';

class Home extends Component {

                render() {
                    return (
                        
                   <div className={`${profile.homePage} d-flex flex-column align-items-center py-5`}>
                        <img className={`${profile.profileImage} pb-5 pt-2`} src={profileImage} alt="myImage" />
                        <div className="profile text-center pb-4 text-white">
                        <h1 className='fw-bold'>START FRAMEWORK</h1> 
                         <div className={`${profile.fontawesome} `}>
                        <i className="fa-solid fa-star text-white"></i>
                        </div>
                        <h6>Graphic Artist - Web Designer - Illustrator</h6>
                        </div>
                  </div>

                    );
                }
    }

export default Home;