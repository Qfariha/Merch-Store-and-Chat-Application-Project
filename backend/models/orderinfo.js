const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const orderSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    address: String,
    cartItems: [{
      _id: String,
      name: String,
      quantity: Number,
      price: Number,
    }],
    subtotal: Number,
  });
  
  const Order = mongoose.model('Order', orderSchema);
  
  // Endpoint to place an order
  app.post('/api/orders', async (req, res) => {
    const { name, phoneNumber, address, cartItems } = req.body;
    const subtotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    
    const order = new Order({
      name,
      phoneNumber,
      address,
      cartItems,
      subtotal,
    });
  
    try {
      await order.save();
      res.status(201).send({ message: 'Order placed successfully', orderId: order._id });
    } catch (error) {
      res.status(400).send({ message: 'Error placing order', error: error.message });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });