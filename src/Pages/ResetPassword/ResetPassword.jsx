import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function ResetnewPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const userData = {
      email: "",
      newPassword: ""
    };
  
    async function mySubmit(values) {
      setIsLoading(true);
      try {
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
        console.log(response);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  
    const formik = useFormik({
      initialValues: userData,
      onSubmit: mySubmit,
      validate: values => {
        const errors = {};
        if (!values.email.includes('@') || !values.email.includes('.')) {
          errors.email = 'Follow standard email format, including "." and "@"';
        }
        if (values.newPassword.length < 6 || values.newPassword.length > 20) {
          errors.newPassword = "Must be between 6 and 20 characters.";
        }
        return errors;
      }
    });
  
    return (
      <div className="w-75 m-auto my-5">
          <Helmet>
             <title>Reset Password</title>
        </Helmet>
        <h2 className='fw-bold mb-4'>Reset Your Password</h2>
  
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3 ">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete='useremail'
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
            />
            <label htmlFor="email">Email address</label>
            {formik.errors.email && formik.touched.email ? (
              <div className='alert alert-danger'>{formik.errors.email}</div>
            ) : null}
          </div>
  
          <div className="form-floating mb-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              autoComplete="new-password"
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="New Password"
            />
            <label htmlFor="newPassword">New Password</label>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className='alert alert-danger'>{formik.errors.newPassword}</div>
            ) : null}
          </div>
  
          <div className="btnForm d-flex justify-content-end mt-4">
            <button type='submit' className='bg-main btn text-white px-4 py-2'>
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="35"
                  width="35"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                />
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    );
}
