import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderInfo = () => {
  const location = useLocation();
  const cart = location.state?.cart; // Retrieve cart from navigation state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });
  const [message, setMessage] = useState('');

  // Handles form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulates order submission
  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(formData)
      .then(() => {
        setMessage('Order placed successfully!');
        // Optional: Redirect to a success page
        // navigate('/success-page');
      })
      .catch((error) => {
        setMessage(`Error placing order. Please try again. ${error.message}`);
      });
  };

  // Placeholder for an actual API call to place the order
  const placeOrder = async (orderData) => {
    console.log('Order data:', orderData);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (orderData.name && orderData.phoneNumber && orderData.address) {
          resolve();
        } else {
          reject(new Error('Invalid order data'));
        }
      }, 1000); // Simulate async API call delay
    });
  };

  // Calculate the subtotal of the cart
  const calculateSubtotal = () => {
    return cart?.reduce((total, item) => total + item.quantity * item.price, 0) || 0;
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>Order Information</h2>
      {message && <p>{message}</p>}

      {/* Display Cart Items and Subtotal */}
      <div>
        <h3 className="text-lg font-semibold">Items in Cart</h3>
        <ul>
          {cart?.map(item => (
            <li key={item._id}>{item.name} - Quantity: {item.quantity}</li>
          ))}
        </ul>
        <p className="font-bold">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
      </div>

      {/* Form for submitting order */}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700'>Phone Number</label>
          <input
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='address' className='block text-sm font-medium text-gray-700'>Address</label>
          <textarea
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
          />
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderInfo;
