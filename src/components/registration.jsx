/*import userpool from '../js/userpool';
import '../css/registration.css';
import React, { Component,useState } from 'react'

export default function registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender,setGender]=useState("");
  const [name,setName]=useState("");
  const [username,setUsername]=useState("");
  const onSubmit=(event)=>{
    event.preventDefault();
    userpool.signUp(email,password,gender,name,username,[],null,(error,data)=>{
      if (error) {
        console.error(error);
      }
      console.log(data);
    });
  };
  return (
    <div className='register'>
    <form onSubmit={onSubmit}>
    <h2 >Registration Form</h2>
      <label htmlFor="fname" style={{fontSize:'20px',fontWeight:'bold',display:'flex',position:'left',margin:'5px'}}>Name</label>
      <input type="text" id="fname" name="firstname" style={{marginLeft:'5px',width:'99%'}} placeholder="Your name.." value={name} onChange={(event)=>setName(event.target.value)} />
      <label htmlFor="Uname" style={{fontSize:'20px',fontWeight:'bold',margin:'5px',display:'flex',position:'left'}} >UserNmae</label>
      <input type="text" id="Uname" style={{marginLeft:'5px',width:'99%'}} name="username" placeholder="abc8899" value={username} onChange={(event)=>setUsername(event.target.value)}/>
      <label htmlFor="GenderIdentity" style={{fontSize:'20px',fontWeight:'bold',margin:'5px',display:'flex',position:'left'}}>Gender<i style={{color: 'red'}}>*</i> </label>
        <select id="GenderIdentity" style={{marginLeft:'5px',width:'99%'}} name="GenderIdentity" value={gender} onChange={(event)=>setGender(event.target.value)}>
          <option value="Compliments">Male</option>
          <option value="Complaint">Female</option>
          <option value="Feedback">Other</option>
        </select>
      <label htmlFor="Gmail" style={{fontSize:'20px',fontWeight:'bold',margin:'5px',display:'flex',position:'left'}} >Gmail</label>
      <input type="text" id="Gmail" style={{marginLeft:'5px',width:'99%'}} name="gmail" placeholder="abc8899@gmail.com" value={email} onChange={(event)=>setEmail(event.target.value)}/>
      <label htmlFor="Gmail" style={{fontSize:'20px',fontWeight:'bold',margin:'5px',display:'flex',position:'left'}} >Password</label>
      <input type="text" id="Password" style={{marginLeft:'5px',width:'99%'}} name="password" placeholder="8Uu@"  value={password} onChange={(event)=>setPassword(event.target.value)} />
      <h2 className='submit'>
      <button type='Submit'> Submit </button>
      </h2>
    </form>
  </div>

  )
}

*/