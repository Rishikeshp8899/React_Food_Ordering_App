import React, { useState } from "react";
import axios from 'axios';
import '../css/registration.css';
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    gender: "",
    gmail: "",
    password: "",
    age: ""
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'username' && errors.username) {
      setErrors(prev => ({ ...prev, username: false }));
    }
    if (name === 'password' && errors.password) {
      setErrors(prev => ({ ...prev, password: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({ username: false, password: false });

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://127.0.0.1:8000/richim/registrations/', {
        name: formData.name,
        username: formData.username,
        gender: formData.gender,
        gmail: formData.gmail,
        password: formData.password,
        age: formData.age
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("in response:-",response)
      // Handle successful response
      if (response.status===201 && response.statusText==="Created") {
        setSubmitStatus('success');
        setFormData({
          name: "",
          username: "",
          gender: "",
          gmail: "",
          password: "",
          age: ""
        });
      } else {
        console.log(response)
        // Handle specific error cases from API
        if (response.data.error === 'username_exists') {
          setSubmitStatus('username_exists');
          setErrors(prev => ({ ...prev, username: true }));
        } else if (response.data.error === 'weak_password') {
          setSubmitStatus('weak_password');
          setErrors(prev => ({ ...prev, password: true }));
        } else {
          setSubmitStatus('save_failed');
        }
      }
    } catch (error) {
      // Handle network errors or server errors
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 409) { // Conflict - username exists
          setSubmitStatus('username_exists');
          setErrors(prev => ({ ...prev, username: true }));
        } else if (error.response.status === 422) { // Unprocessable Entity - weak password
          setSubmitStatus('weak_password');
          setErrors(prev => ({ ...prev, password: true }));
        } else {
          setSubmitStatus('save_failed');
        }
      } else {
        // Network error or other issues
        setSubmitStatus('save_failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-card">
      <div className="register-header">
        <h2>Registration Form</h2>
      </div>
      
      <div className="register-main">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Rishikesh Patil"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="ram"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error-input' : ''}
              required
            />
            {errors.username && <span className="error-message">User exists</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender*</label>
            <select
              id="gender"
              className="SelectEffect"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="25"
              value={formData.age}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gmail">Email</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              placeholder="rishikesh@example.com"
              value={formData.gmail}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="sita@123"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error-input' : ''}
              required
            />
            {errors.password && <span className="error-message">Password is not strong</span>}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="success-message">
            Registration successful!  <Link to="/lohin">Home</Link> | 
          </div>
        )}
        {submitStatus === 'username_exists' && (
          <div className="error-message">
            Username already exists. Please choose another.
          </div>
        )}
        {submitStatus === 'weak_password' && (
          <div className="error-message">
            Password is not strong enough. Use 8+ characters with mix of letters, numbers and symbols.
          </div>
        )}
        {submitStatus === 'save_failed' && (
          <div className="error-message">
            Failed to save. Please try again later.
          </div>
        )}
      </form>

      </div>
      
    </div>
  );
};

export default Register;