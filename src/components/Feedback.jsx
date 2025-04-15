// import React from 'react'
// import '../css/feedback.css';
// export default function Feedback() {
//   return (
//     <div className='section'style={{marginBlockStart:"0px"}}>
//     <h3>Feedback Form</h3>
//     <div className="contaner"style={{margin:"-20px"}}>
//       <form className='feedback' style={{width:'95%',height:'80%',marginLeft:"-10px"}}  action="#" method="POST" autoComplete="off">
//         <label htmlFor="fname" >First Name</label>
//         <input type="text" id="fname" name="firstname" placeholder="Your name.." />
//         <label htmlFor="lname">Last Name</label>
//         <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
//         <label htmlFor="country">State <i style={{color: 'red'}}>*</i></label>
//         <select id="state" name="state">
//           <option value="Maharashtra">Maharashtra</option>
//           <option value="Gujarata">Gujarata</option>
//           <option value="Karnatak">Karnatak</option>
//         </select>
//         <label htmlFor="I Want To">I Want To  <i style={{color: 'red'}}>*</i> </label>
//         <select id="IWantTo" name="IWantTo">
//           <option value="Compliments">Compliments</option>
//           <option value="Complaint">Complaint</option>
//           <option value="Feedback">Feedback</option>
//         </select>
//         <label htmlFor="RelatedTo"> Related To  <i style={{color: 'red'}}>*</i> </label>
//         <select id="RelatedTo" name="RelatedTo">
//           <option value="Online Ordering site ">Online Ordering site </option>
//           <option value="Our Product">Our Product </option>
//           <option value="Our Services">Our Services</option>
//         </select>
//         <label htmlFor="subject">Subject</label>
//         <textarea id="subject" name="subject" placeholder="Write something.." style={{height: '200px'}} defaultValue={""} />
//         <input style={{}} type="submit" defaultValue="Post" />
//       </form>
//     </div>
//   </div>

//   )
// }

import React, { useState } from 'react';
import axios from 'axios';
import '../css/feedback.css';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name_first: '',
    name_second: '',
    
    i_want_to: 'feedback', // Default selection
    related_to: 'our Product', // Default selection
    subject: '',
    date_of_feedback: new Date().toISOString() // Today's date
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post('http://127.0.0.1:8000/richim/feedback/', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage('Feedback submitted successfully!');
      // Reset form
      setFormData({
        name_first: '',
        name_second: '',
        i_want_to: 'Feedback',
        related_to: 'Our Product',
        subject: '',
        date_of_feedback: new Date().toISOString()
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className='section' style={{ marginBlockStart: "0px" }}>
      <h3>Feedback Form</h3>
      <div className="contaner" style={{ margin: "-20px" }}>
        <form 
          className='feedback' 
          style={{ width: '95%', height: '80%', marginLeft: "-10px" }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name_first">First Name</label>
          <input 
            type="text" 
            id="name_first" 
            name="name_first" 
            value={formData.name_first}
            onChange={handleChange}
            placeholder="Your first name.." 
            required
          />

          <label htmlFor="name_second">Last Name</label>
          <input 
            type="text" 
            id="name_second" 
            name="name_second" 
            value={formData.name_second}
            onChange={handleChange}
            placeholder="Your last name.." 
            required
          />

          <label htmlFor="i_want_to">I Want To <i style={{ color: 'red' }}>*</i></label>
          <select 
            id="i_want_to" 
            name="i_want_to"
            value={formData.i_want_to}
            onChange={handleChange}
            required
          >
            <option value="compliment">Compliments</option>
            <option value="complaint">Complaint</option>
            <option value="feedback">Feedback</option>
          </select>

          <label htmlFor="related_to">Related To <i style={{ color: 'red' }}>*</i></label>
          <select 
            id="related_to" 
            name="related_to"
            value={formData.related_to}
            onChange={handleChange}
            required
          >
            <option value="Online Ordering site">Online Ordering site</option>
            <option value="our Product">Our product</option>
            <option value="our Services">Our services</option>
          </select>

          <label htmlFor="subject">Subject</label>
          <textarea 
            id="subject" 
            name="subject" 
            value={formData.subject}
            onChange={handleChange}
            placeholder="Write your feedback..." 
            style={{ height: '200px' }}
            required
          />

          <input type="submit" value="Submit Feedback" />
          {message && <div className="feedback-message">{message}</div>}
        </form>
      </div>
    </div>
  );
}