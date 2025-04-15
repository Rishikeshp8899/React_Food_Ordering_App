import React, { useEffect, useState } from 'react';
import '../css/header.css';
import logo from '../img/imageedit_1_7136019323.png';
import { Link, useNavigate } from 'react-router-dom';
import checkAuthAndRedirect from '../utils/urls';

export default function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await checkAuthAndRedirect(navigate);
      console.log("auth check result:", result);
      if (result.result === 1) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, [navigate]);

  return (
    <div className="heder_home">
      <b style={{ color: 'goldenrod', textAlign: 'center' }}>
        This Website only serves the western and southern states of India
      </b>
      <div className="headerl">
        <ul>
          <li>
            <img src={logo} width="100px" height="100px" alt="Logo" />
          </li>
          <li>
            <Link to="/">
              <b id="ma" style={textStyle}><h2>ORDER</h2></b>
            </Link>
          </li>
          <Separator />
          <li>
            <Link to="/helpcenter">
              <b style={textStyle}><h2>HELP CENTER</h2></b>
            </Link>
          </li>
          <Separator />
          <li>
            <Link to="/offer">
              <b style={textStyle}><h2>OFFERS</h2></b>
            </Link>
          </li>
          <Separator />
          <li>
            <Link to="/feedback">
              <b style={textStyle}><h2>FEEDBACK</h2></b>
            </Link>
          </li>
          <Separator />
          <li>
            <Link to="/carts">
              <b style={textStyle}><h2>CART</h2></b>
            </Link>
          </li>
          <Separator />
          <li>
            {isAuthenticated ? (
              <Link to="/logout">
                <b style={textStyle}><h2>LOGOUT</h2></b>
              </Link>
            ) : (
              <Link to="/login">
                <b style={textStyle}><h2>LOGIN</h2></b>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

const textStyle = {
  color: 'goldenrod',
  fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',
};

const Separator = () => (
  <li>
    <h1 style={textStyle}>|</h1>
  </li>
);
