// import '../css/hamepage.css';
// import Items from './Items';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import Feedback from './Feedback';
// import Helpcenter from './Helpcenter';
// import Carts from './Carts';
// import Offer from './Offer';
// import React, { useEffect } from 'react';
// import CardsItems from './items/CardsItems';
// import Beveraver from './items/Beverave';
// import Cofee from './items/Cofee';
// import Desert from './items/Desert';
// import Meal from './items/Meal';
// import RiceBowl from './items/RiceBowl';
// import Tea from './items/Tea';
// import Login from './Login';
// import Signup from './Register';
// import { useSelector } from 'react-redux';

// export default function Pade() {
//   const token = useSelector(state => state.token.value);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token === "") {
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   return (
//     <div className='homepage'>
//       <Items />
//       <Routes>
//         <Route path='/cards/burger' element={<CardsItems  num="2" />} />
//         <Route path='/cards/riceBowl' element={<RiceBowl />} />
//         <Route path='/cards/meal' element={<Meal />} />
//         <Route path='/cards/cofee' element={<Cofee />} />
//         <Route path='/cards/tea' element={<Tea />} />
//         <Route path='/cards/beverage' element={<Beveraver />} />
//         <Route path='/cards/dessert' element={<Desert />} />
//         <Route path='/helpcenter' element={<Helpcenter />} />
//         <Route path='/feedback' element={<Feedback />} />
//         <Route path='/offer' element={<Offer />} />
//         <Route path='/carts' element={<Carts />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/registration' element={<Signup />} />
//       </Routes>
//     </div>
//   );
// }

import '../css/hamepage.css';
import Items from './Items';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Feedback from './Feedback';
import Helpcenter from './Helpcenter';
import Carts from './Carts';
import Offer from './Offer';
import React, { useEffect, useState } from 'react';
import CardsItems from './CardsItems';
import Login from './Login';
import Signup from './Register';
import { useSelector } from 'react-redux';
import axios from 'axios';
import checkAuthAndRedirect from '../utils/urls'
import Logout from './Logout';

export default function Pade() {
  const token = useSelector(state => state.token.access);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/richim/category',
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        setCategories(response.data.success);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchCategories();
      checkAuthAndRedirect(navigate)
  }, [token, navigate]);

  const generateRoutes = () => {
    return categories.map(category => (
      <Route 
        key={category.id}
        path={`/cards/${category.name.toLowerCase()}`}
        element={<CardsItems num={category.id.toString()} />}
      />
    ));
  };


  return (
    <div className='homepage'>
      <Items />
      <Routes>
        {generateRoutes()}
        <Route path='/helpcenter' element={<Helpcenter />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/offer' element={<Offer />} />
        <Route path='/carts' element={<Carts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  );
}
