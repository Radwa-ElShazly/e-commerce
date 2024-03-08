import React, { Component } from 'react';
import aboutStyles from './about.module.css'
class About extends Component {
    render() {
        return (
            <>
            <div className={`${aboutStyles.body}`}>
              <h1 className='text-center fw-bold'>ABOUT COMPONENT</h1>
              <div className={`${aboutStyles.fontawesome} text-center`}>
               <i className="fa-solid fa-star"></i>
              </div>
              <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <p className='px-4'>
                        Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.
                        </p>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <p  className='px-4'>
                        Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.
                        </p>
                    </div>
                </div>
              </div>
            </div>  
        
            </>
        );
    }
}

export default About;