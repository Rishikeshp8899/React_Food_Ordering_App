import React, { useState,useEffect } from 'react'
import '../css/login.css';
import * as axios from 'axios';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, clearToken } from '../reducers/TokenReducer';
import { useNavigate } from "react-router-dom";
  export default function Login2() {
    const navigate = useNavigate();
    const [usernme,setUsername]=useState("");
    const [passwrd, setPassword] =useState("");
    const dispatch = useDispatch();

    function subMitOrder(event){
      event.preventDefault();
    
      const  registerUrl='http://127.0.0.1:8000/richim/login/username/'
 
      axios.post(registerUrl, 
        {username:usernme,
        password:passwrd})
      .then(function (response) {
       var jwt=response.data
       console.log(jwt.access)
       dispatch(setToken({
        access:jwt.access,
        refresh: jwt.refresh,
        user:jwt.user
      }));
      localStorage.setItem("token", jwt.access);
      navigate('/cards/burger');

      })
      .catch(function (error) {
        console.log(error);
        dispatch(clearToken);
      })
  
      
      
    }
    return (
      <form className="registers">
      <h2>Sign In </h2>
      <div className="form-group">
          <h4>UserName</h4>
          <input type="username" className="form-control" placeholder="Enter email" onChange={(event)=>setUsername(event.target.value)}/>
      </div>
      <div className="form-group">
          <h4>Password</h4>
          <input type="password" className="form-control" placeholder="Enter password"  style={{ right: "-25px" }} onChange={(event)=>setPassword(event.target.value)}/>
      </div>
      <div className="button-submit">
      <button type="submit" className="btnbtn-primarybtn-block" onClick={subMitOrder}>Sign In</button></div>
      <p className="forgot-password text-right">
          Not registered <Link to={'/registration'}>register here?</Link> 
      </p>
      {}
      </form>
    )
  }
  


