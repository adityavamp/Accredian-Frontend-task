// Registration.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import './Registration.css'
const Registration = () => {
  const navigation=useNavigate()
  const [sucess, setSucess] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  const [error,seterror]=useState({
    usernameexist:true,username:true,email:true,password:true,passwordc:true,captcha:true
  ,emailexist:true,ipassword:true,captcha:true})

  const handleRegistration = async (event) => {
    setSucess(false)
    event.preventDefault();
    console.log("hello")
    seterror({...error,usernameexist:true,password:true,username:true,email:true,captcha:true,emailexist:true,passwordc:true,ipassword:true});

    try {
      const response = await axios.post('https://accredian-backend-task-ng74.onrender.com/register', {
        username: username,
        email: email,
        password: password,
        confirmPassword:confirmPassword
      });
      if (response.data.error === 'Username is required') {
        seterror({...error,username:false});
      } else if (response.data.error === 'Password is required') {
        seterror({...error,password:false});
      } else if (response.data.error === 'Username already exists') {
        seterror({...error,usernameexist:false});
      }else if (response.data.error === 'Email already exists') {
        seterror({...error,emailexist:false});
      }else if (response.data.error === 'Passwords do not match') {
        seterror({...error,passwordc:false});
      }else if (response.data.error === 'Invalid Password') {
        seterror({...error,ipassword:false});
      }else if (response.data.error === 'Invalid email format') {
        seterror({...error,email:false});
      }else if (response.data.error === 'reCAPTCHA verification failed') {
        seterror({...error,captcha:false});
      }else {
        setSucess(true)
        seterror({...error,usernameexist:true,password:true,username:true,email:true,captcha:true,emailexist:true,passwordc:true,ipassword:true,captcha:true});
      }
      setCaptchaValue(null)
      console.log(response.data)
    } catch (error) {
      console.log(error.message+" ");
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div class="body">
    <div class="container">
  <div class="title">Registration</div>
  <div class="content">
    <form action="#" method='POST' >
      <div class="user-details">
        <div class="input-box">
          <span class="details">User Name</span>
          <input type="text" name="name"   placeholder="Enter your User name" style={{borderColor: !error.usernameexist||!error.username  ? 'red' : "#9b58b6"}}  required onChange={(e) => setUsername(e.target.value)} />
          {!error.usernameexist?
        <div style={{"fontSize":"15px","color":"red"}}>
          username Already Exists
        </div>:<span></span>}
        </div>
        
        <div class="input-box">
          <span class="details">Email</span>
          <input type="text" name="email"  placeholder="Enter your email" style={{borderColor: !error.emailexist||!error.email  ? 'red' : "#9b58b6"}} onChange={(e) => setEmail(e.target.value)} required />
          {!error.emailexist?
        <div style={{"fontSize":"15px","color":"red"}}>
          Email Already Registered
        </div>:<span></span>}
        </div>
        
        <div class="input-box">
          <span class="details">Password</span>
          <input type="password" name="password" placeholder="Enter your password" style={{borderColor: !error.password||!error.ipassword  ? 'red' : "#9b58b6"}}onChange={(e) => setPassword(e.target.value)}  required />
          {!error.ipassword?
        <div style={{"fontSize":"15px","color":"red"}}>
        Password: 8+ chars, uppercase, lowercase, digit.
        </div>:<span></span>}
        </div>
        
        <div class="input-box">
          <span class="details">Confirm Password</span>
          <input type="password" name="passwordc" onChange={(e) => setConfirmPassword(e.target.value)}  style={{borderColor: !error.passwordc ? 'red' : "#9b58b6"}} placeholder="Confirm your password" required />
          {!error.passwordc?
        <div style={{"fontSize":"15px","color":"red"}}>
        Password dont match
        </div>:<span></span>}
        </div>
      </div>
      <div className="captcha-group">
        <ReCAPTCHA sitekey="6Le-eywpAAAAAPeE6udVa56XZg3RGrgu8vLMBTZO" onChange={handleCaptchaChange} />
      </div>
      <div class="button" onClick={handleRegistration}>
        <input type="submit" value="Register" />
        <input type="submit" value="Login" onClick={()=>{navigation('/login')}} />
        {!error.captcha?<div style={{"fontSize":"15px","color":"red","textAlign":"center","fontSize":"20px"}}>Invalid Captcha</div>:<span></span>}
        {sucess?
        <div style={{"fontSize":"20px","color":"green","textAlign":"center","marginTop":"20px"}}>
        Registration successful
        </div>:<span></span>}
      </div>

    </form>
  </div>
</div>
    </div>
  );
};

export default Registration;
