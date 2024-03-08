import React, { Component } from 'react';
import contactStyles from './contact.module.css'
function Contact (){

        return (
            <div className='contact-page py-4'>
            <h1 className={`${contactStyles.mainColor} fw-bold text-center`}>CONATCT SECTION</h1>
            <div className={`${contactStyles.fontawesome} main-icon mb-5  text-center pb-5`}>
            <i className="fa-solid fa-star"></i>
            </div>
             <form action="">    
             <div className="container w-50 m-auto mt-5">
                
                <div className={`${contactStyles.inputForm} m-3 `}>
                <label className={contactStyles.secoundColor} htmlFor="">userName :</label>
                <input className="form-control border border-top-0 border-start-0 border-end-0 py-2 mb-5" type="text" placeholder="userName" aria-label="default input example"/>
                </div>


                <div className={`${contactStyles.inputForm} m-3`}>
                <label className={contactStyles.secoundColor} htmlFor="">userAge :</label>
                <input className={`form-control border border-top-0 border-start-0 border-end-0  py-2  mb-5`} type="text" placeholder="userAge" aria-label="default input example"/>
                </div>

                <div className={`${contactStyles.inputForm} m-3`}>
                <label className={contactStyles.secoundColor} htmlFor="">userEmail :</label>
                <input className="form-control border border-top-0 border-start-0 border-end-0  py-2  mb-5" type="email" placeholder="userEmail" aria-label="default input example"/>
                </div>

                <div className={`${contactStyles.inputForm} m-3`}>
                <label className={contactStyles.secoundColor} htmlFor="">userPassword :</label>
                <input className="form-control border border-top-0 border-start-0 border-end-0 py-2  mb-5" type="password" placeholder="userPassword" aria-label="default input example"/>
                </div>

                <button className={`${contactStyles.sendButton} ms-3 mt-2  text-white mb-3`}>send Massage</button>
                </div>
             </form>
            </div>
        );
    
}

export default Contact;