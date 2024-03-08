import React, { Component } from 'react';
import footerStyle from './footer.module.css'
class Footer extends Component {
    render() {
        return (
            <>
            <div className={`${footerStyle.footerSection}`}>
                <div className="container m-auto py-5">
                    <div className="row text-center text-white py-5">
                        <div className="col-lg-4 col-md-6 pb-ms-5">
                            <h3>LOCATION</h3>
                            <p>2215 John Daniel Drive</p>
                            <p>Clark, MO 65243</p>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-ms-5">
                            <h3>AROUND THE WEB</h3>
                             <div className="icon d-flex justify-content-center">
                             <i className="fa-brands fa-facebook text-white border border-2 rounded-5 p-2 mx-1"></i>
                             <i className="fa-brands fa-twitter text-white border border-2 rounded-5 p-2 mx-1"></i>
                             <i className="fa-brands fa-linkedin-in text-white border border-2 rounded-5 p-2 mx-1"></i>
                             <i className="fa-solid fa-globe text-white border border-2 rounded-5 p-2 mx-1"></i>
                             </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-ms-5">
                            <h3>ABOUT FREELANCER</h3>
                            <h6>Freelance is a free to use, licensed Bootstrap theme created by Route</h6>
                        </div>
                    </div>
                </div>
             <div className="footer text-center bg-dark text-white py-4">
                <h6>Copyright © Your Website 2021</h6>
             </div> 

            </div>
  
            </>
        );
    }
}

export default Footer;