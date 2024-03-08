import React, { Component, useEffect } from "react";
import port1 from "../../image/poert1.png";
import port2 from "../../image/port2.png";
import port3 from "../../image/port3.png";
import portfolioStyle from "./portfolio.module.css";

function Portfolio() {



  return (
    <>
      <div
        className={`${portfolioStyle} d-flex flex-column align-items-center py-4 mt-1 position-realative`}
      >
        <h1 className={`${portfolioStyle.proColor} fw-bold`}>
          PORTFOLIO COMPONENT
        </h1>
        <div className={`${portfolioStyle.fontawesome} mb-3`}>
          <i className={` fa-solid fa-star`}></i>
        </div>
        <div className="container">
          <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <div className={portfolioStyle.portImage} data-bs-toggle="modal" data-bs-target="#exampleModal1">
            <img className={`w-100 rounded-2`} src={require('../../image/poert1.png')}  alt="portImage" />
                <div className={portfolioStyle.portIcon}>
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>

            </div>

            <div className="col-lg-4 col-md-6">
            <div className={portfolioStyle.portImage} data-bs-toggle="modal" data-bs-target="#exampleModal2">
            <img className={`w-100 rounded-2`} src={require('../../image/port2.png')} alt="portImage" />
                <div className={portfolioStyle.portIcon}>
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>

            </div>

            <div className="col-lg-4 col-md-6">
            <div  className={portfolioStyle.portImage} data-bs-toggle="modal" data-bs-target="#exampleModal3">
            <img className={` w-100 rounded-2`} src={require('../../image/port3.png')} alt="portImage" />
                <div className={portfolioStyle.portIcon}>
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>

            </div>

            <div className="col-lg-4 col-md-6">
            <div className={portfolioStyle.portImage} data-bs-toggle="modal" data-bs-target="#exampleModal1">
            <img className={` w-100 rounded-2`} src={require('../../image/poert1.png')}  alt="portImage" />
                <div className={portfolioStyle.portIcon}>
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>

            </div>

            <div className="col-lg-4 col-md-6">
            <div className={portfolioStyle.portImage} data-bs-toggle="modal" data-bs-target="#exampleModal2">
            <img className={`w-100 rounded-2`} src={require('../../image/port2.png')} alt="portImage" />
                <div className={portfolioStyle.portIcon}>
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>

            </div>

            <div className="col-lg-4 col-md-6">
            <div className={portfolioStyle.portImage} data-bs-toggle="modal" data-bs-target="#exampleModal3">
            <img className={`w-100 rounded-2`} src={require('../../image/port3.png')} alt="portImage" />
                <div className={portfolioStyle.portIcon}>
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>

            </div>

         </div>
        </div> 



        <div className={` container d-flex justify-content-center align-items-center`}>
          <div className="row">
          <div className={` modal fade`} id="exampleModal1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div className="modal-dialog">
              <div className={`${portfolioStyle.Image} modal-content`}>
               <img  src={require('../../image/poert1.png')} alt="portImage" />
              </div>
             </div>
          </div>
          </div>
        </div>

        <div className={` container d-flex justify-content-center align-items-center`}>
          <div className="row">
          <div className={` modal fade`} id="exampleModal2"  aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div className="modal-dialog">
              <div className={`${portfolioStyle.Image} modal-content `}>
               <img  src={require('../../image/port2.png')} alt="portImage" />
              </div>
             </div>
          </div>
          </div>
        </div>


        <div className={` container d-flex justify-content-center align-items-center`}>
          <div className="row">
          <div className={` modal fade`} id="exampleModal3"  aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div className="modal-dialog">
              <div className={`${portfolioStyle.Image} modal-content `}>
               <img  src={require('../../image/port3.png')} alt="portImage" />
              </div>
             </div>
          </div>
          </div>
        </div>
      </div>  
    </>
  );
}

export default Portfolio;


