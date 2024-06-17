import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { ThreeDots } from 'react-loader-spinner';

export default function AllOrders() {
    const [allOrder, setAllOrder] = useState(null);
    
    const getUserOrder = async () => {
      const userID = localStorage.getItem('userID');
      console.log(userID);
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`, {
          headers: { token: localStorage.getItem('tkn') }
        });
        const data = response.data;
        if (data) {
          console.log(data);
          setAllOrder(data); 
        }
      } catch (error) {
        console.error('Error in order:', error);
      }
    };
  
    useEffect(() => {
     getUserOrder();
    }, []);
  
    if (!allOrder) {
      return (
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="gray"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      );
    }
  
    return (
      <div className="container my-5">
        <Helmet>
          <title>All Orders</title>
        </Helmet>
      <div className="row d-flex g-4">
        {allOrder.map((order) => (
          <div key={order._id} className="col-xl-6">
            <div className="px-3 border border-1 border-black">
                          <div className="container">
              <div className="row">
                {order.cartItems.map((item, indx) => (
                  <div key={item._id || indx} className="col-md-4 p-3 ">
                    <div className="order border bg-body-secondary rounded-1">
                      <img src={item.product.imageCover} alt={item.product.title} className="w-100" />
                      <h2 className='h6'>Price: {item.price}</h2>
                      <h2 className='h6'>Count: {item.count}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order mb-3 p-3">
              <h5>Payment Method Type: {order.paymentMethodType}</h5>
              <h5>Total Order Price: {order.totalOrderPrice}</h5>
              <p>
                Order ID delivering to {order.shippingAddress.city} on {order.shippingAddress.phone}
              </p>
            </div>
            </div>

          </div>
        ))}
      </div>
    </div>
    );
}
