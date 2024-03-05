import axios from 'axios'
import React, { useContext } from 'react'
import { cartContextProduct } from '../../Context/CartContextPro';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFormik} from 'formik';




export default function Payment() {
  const navigation = useNavigate();
  const { cartID, getUserCart, clearProduct } = useContext(cartContextProduct);
  console.log(cartID);

  async function confirmCashPayment(values) {
    try {
      const shippingObject = {
        shippingAddress: {
          city: values.city,
          phone: values.phone,
          details: values.details,
        },
      };

      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        shippingObject,
        {
          headers: { token: localStorage.getItem('tkn') },
        }
      );

      console.log(response);

      if (response.data.status === 'success') {
        toast.success('Payment completed successfully');
        getUserCart();
        clearProduct();
        setTimeout(() => {
          navigation('/product');
        }, 1500);
      } else {
        toast.error('Payment failed');
      }
    } catch (error) {
      console.error('Error confirming cash payment:', error);
      toast.error('An error occurred while processing your payment');
    }
  }

  async function confirmOnlinePayment(values) {
    const shippingObject = {
      shippingAddress: {
        city: values.city,
        phone: values.phone,
        details: values.details,
      },
    };
    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`,
        shippingObject,
        {
          headers: { token: localStorage.getItem('tkn') },
        },
        {
          params: {
            url: 'http://localhost:3000',
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === 'success') {
          window.open(response.data.session.url, '_self');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Payment failed');
      });
    console.log(values);
  }

  const paymentDetails = {
    city: '',
    phone: '',
    details: '',
  };

  const paymentFormik = useFormik({
    initialValues: paymentDetails,
    onSubmit: (values) => {
      if (values.paymentMethod === 'cash') {
        confirmCashPayment(values);
      } else {
        confirmOnlinePayment(values);
      }
    },
    validate: function (values) {
      const errors = {};
      const cityRegex = /^[A-Z][a-z]{2,20}$/;
      if (!cityRegex.test(values.city)) {
        errors.city =
          'City must start with a capital letter and be between 2 to 20 characters.';
      }

      const phoneRegex = /^01[0125][0-9]{8}$/;
      if (!phoneRegex.test(values.phone)) {
        errors.phone = 'Phone must be a valid Egyptian number.';
      }

      if (values.details.length < 6 ) {
        errors.details = 'Details should contain more than 6 characters';
      }
      return errors;
    },
  });

  return (
    <>
      <div>
        <Helmet>
          <title>Payment Component</title>
        </Helmet>
      </div>

      <form action="" onSubmit={paymentFormik.handleSubmit}>
        <div className="w-75 m-auto py-4">
         <label htmlFor="" className="mb-1">City</label>
          <input onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur}
            type="text"
            id="city"
            placeholder="city..."
            className="form-control mb-3"
            value={paymentFormik.values.city}
          />
          {paymentFormik.errors.city && paymentFormik.touched.city ? (
            <div className="alert alert-danger mb-3">
              {paymentFormik.errors.city}
            </div>
          ) : (
            ''
          )}

          <label htmlFor="phone" className="mb-1">
            Phone
          </label>
          <input
            onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur}
            type="text"
            id="phone"
            placeholder="phone..."
            className="form-control mb-3"
            value={paymentFormik.values.phone}
          />
          {paymentFormik.errors.phone && paymentFormik.touched.phone ? (
            <div className="alert alert-danger mb-3">
              {paymentFormik.errors.phone}
            </div>
          ) : (
            ''
          )}

          <label htmlFor="details" className="mb-1">
            Details
          </label>
          <textarea
            onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur}
            name="details"
            id="details"
            rows="4"            className="form-control mb-4"
            value={paymentFormik.values.details}
          ></textarea>
          {paymentFormik.errors.details && paymentFormik.touched.details ? (
            <div className="alert alert-danger mb-3">
              {paymentFormik.errors.details}
            </div>
          ) : ( '' )}

          <button type="submit" className="btn btn-primary w-25 me-5">
            Confirm Cash Payment
          </button>
          <button type="submit" className="btn btn-outline-primary w-25">
            Online Payment
          </button>


        </div>
      </form>
    </>
  );
}


// 3 phases  => Development , testing ,deployment

/*
deploy  our project on server
1-host server:
computer (with specific qualification) =>besht3'l as server 
free server:Netify  , Github
=> limitation 
paid servers:
24/7 availability
=> requests
IANA owns servers
*/
