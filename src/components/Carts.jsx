import React, { useState } from 'react';
import '../css/carts.css';
import { removeItems, emptyState, addQuantity, subtractQuantity } from '../reducers/cartReducer';
import { useSelector, useDispatch} from "react-redux";
// import { Navigate } from 'react-router-dom';
import useGeolocation from 'react-hook-geolocation';
import axios from 'axios';
// import { response } from 'express';
import checkAuthAndRedirect from '../utils/urls'
import {  useNavigate } from 'react-router-dom';

export default function Carts() {
  const [message, setMessage] = useState("");
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [gst, setGst] = useState(0);

  const geolocation = useGeolocation();
  const longitude = geolocation.longitude;
  const latitude = geolocation.latitude;
  const token = useSelector(state => state.token.access);
  const userId = useSelector(state => state.token.user);
  const cartItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total and GST whenever quantities or cartItems change
  React.useEffect(() => {
    checkAuthAndRedirect(navigate)
    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * (quantities[item.name] || item.quantity)), 0);
    setTotal(newTotal);
    setGst(parseInt(newTotal + (newTotal * 28 / 100)));
  }, [quantities, cartItems]);

  // Initialize quantities from cart items
  React.useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.name] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (e, itemName) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantities(prev => ({
      ...prev,
      [itemName]: value
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className='emptyList'>
        <div style={{ marginTop: '15%' }}>
          <img 
            src={require('../img/output-onlinegiftools (1).gif')} 
            style={{ width: '100%' }} 
            alt="Empty cart" 
          />
        </div>
        <div>
          <h1 style={{ color: '#B33F40' }}>Cart is Empty!!!</h1>
        </div>
      </div>
    );
  }


  async function submitOrder(event) {
    event.preventDefault();
    const registerUrl = 'http://127.0.0.1:8000/richim/orders/';
    const requestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };


    const single_order_products_list=cartItems.reduce((list,item)=>[
      ...list,
      {  name: item.name,
        quantity: quantities[item.name] || item.quantity,
        price: item.price
      }
    ]
    ,[])
 

    const requestBody = {
      gps: `${latitude},${longitude}`,
      amount: gst,
      date_order: new Date().toISOString(),
      user: userId,
      single_order_products:single_order_products_list
    };

    try {
      const response = await axios.post(registerUrl, requestBody, requestConfig);
      if(response.status===201){
        alert("Order Placed Successfully");
        dispatch(emptyState(1))
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setMessage(error.response.data.message);
      } else {
        console.log(error)
        setMessage('Backend server is down');
      }
    }
  }

  const renderCartItems = cartItems.map(item => (
    <tr key={item.name}>
      <td>
        <img 
          style={{ 
            width: '200px',
            height: '200px',
            padding: '2px', 
            borderRadius: '25px' 
          }} 
          src={`data:image/jpeg;base64,${item.img}`} 
          alt={item.name} 
        />
      </td>
      <td>
        <div className='items_name'>
          <h2 style={{
            fontFamily: '"Lucida Console", "Courier New", monospace',
            fontSize: '20px',
            color: 'rebeccapurple'
          }}>
            {item.name}
          </h2>
        </div>
      </td>
      <td>
        <div className='quantity-control' id='incremet'>
          <div>
            <button onClick={() => dispatch(subtractQuantity(item.name ))}>
              <h1>-</h1>
            </button>
          </div>
          <div>
            <input 
              type="number" 
              min="1"
              value={quantities[item.name] || item.quantity}
              onChange={(e) => handleQuantityChange(e, item.name)}
            />
          </div>
          <div>
            <button onClick={() => dispatch(addQuantity(item.name))}>
              <h1>+</h1>
            </button>
          </div>
        </div>
      </td>
      <td>
        <h2>₹{item.price * (quantities[item.name] || item.quantity)}</h2>
      </td>
      <td>
        <button 
          style={{ 
            width: '90px',
            height: '40%',
            background: '#CC3333',
            color: 'white',
            textAlign: 'center'
          }} 
          onClick={() => dispatch(removeItems({ name: item.name }))}
        >
          Remove
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="tableScroller">
      <div className="tableWrapper">
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Image</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Quantity</th>
            <th style={{ textAlign: 'center' }}>Price</th>
            <th style={{ textAlign: 'center' }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {renderCartItems}
        </tbody>
        <tbody>
          <tr>
            <td colSpan="2"></td>
            <td>
              <img 
                src={require('../img/442-4420708_sigma-symbol-background-hd-png-download-removebg-preview.png')} 
                width='20px' 
                height='20px' 
                alt="Total" 
              />
            </td>
            <td>
              <h2 style={{
                fontFamily: '"Lucida Console", "Courier New", monospace',
                fontSize: '20px',
                color: '#B2022F'
              }}>
                ₹{total}
              </h2>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <h1 style={{
                fontFamily: '"Lucida Console", "Courier New", monospace',
                fontSize: '30px',
                color: '#1B1B1B'
              }}>
                GST Included
              </h1>
            </td>
            <td>
              <h1 style={{
                fontFamily: '"Lucida Console", "Courier New", monospace',
                fontSize: '30px',
                color: '#B2022F'
              }}>
                ₹{gst}
              </h1>
            </td>
            <td>
              <button 
                id='buttonOrder' 
                style={{ 
                  width: '150px',
                  height: '40%',
                  background: '#3e8e41',
                  color: 'white'
                }} 
                onClick={submitOrder}
              >
                <h1 style={{
                  fontFamily: '"Lucida Console", "Courier New", monospace',
                  fontSize: '30px',
                  color: 'white'
                }}>
                  Order
                </h1>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}