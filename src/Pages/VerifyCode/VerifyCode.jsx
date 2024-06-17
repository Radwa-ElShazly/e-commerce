import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    async function mySubmit(values) {
      setIsLoading(true);
      try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
        console.log(response);
        if (response.data) {
          setTimeout(() => {
            navigate('/reset-password');
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  
    const formik = useFormik({
      initialValues: {
        resetCode: ""
      },
      onSubmit: mySubmit,
      validate: values => {
        const errors = {};
        const codeRegex = /^[0-9]{3,8}$/;
        if (!codeRegex.test(values.resetCode)) {
          errors.resetCode = 'The code must be a 6-digit number';
        }
        return errors;
      }
    });
  
    return (
      <div className="w-75 m-auto my-5">
         <Helmet>
             <title>Verify Code</title>
        </Helmet>
        <h2 className='fw-bold'>Reset your account password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="inputForm mt-5">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              autoComplete='off'
              id='resetCode'
              name='resetCode'
              type="text"
              placeholder='Enter your reset code'
              className='form-control mb-3 py-3'
            />
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div className='alert alert-danger'>{formik.errors.resetCode}</div>
            ) : null}
          </div>
          <div className="btnForm d-flex justify-content-end">
            <button type='submit' className='bg-main btn text-white px-4 py-2'>
              {isLoading ?
                <ColorRing
                  visible={true}
                  height="35"
                  width="35"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                /> :
                "Verify"
              }
            </button>
          </div>
        </form>
      </div>
    );
}
