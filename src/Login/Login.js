import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css'
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false)
  const [error, setError] = useState(false);
  const navigation=useNavigate()
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const [errormessage,setErrormessage]=useState('')
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true)
    setError(false)
    try {
 
      const response = await axios.post('https://accredian-backend-task-ng74.onrender.com/login', {
        username: username,
        password: password,
      });
      console.log(response.data.error)
      if(!captchaValue)
      {
          setErrormessage('Invalid Captcha')
          setError(true);
      }
      else if (response.data.message === 'Login successful') {
        console.log('Login successful');
        navigation('/home')
      } else if (!username) {
        setErrormessage("Enter Username")
        setError(true);
      } else if (!password) {
        setErrormessage("Enter password")
        setError(true);
      }
      else{
        setErrormessage("User not found or Invalid password")
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false)
  };

  return (
    <div>
		<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form" onSubmit={handleLogin}>
					<span class="login100-form-title p-b-34 p-t-27">
						Log in
					</span>
					<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<input class="input100" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
						<span class="focus-input100" data-placeholder="&#xf207;"></span>
					</div>
					{error.username?
						<div style={{"fontSize":"15px","color":"red"}}>username doesn't exists</div>:<div></div>}
					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
						<span class="focus-input100" data-placeholder="&#xf191;"></span>
					</div>
					{error.password?
						<div style={{"fontSize":"15px","color":"red"}}>password doesn't not match</div>:<div></div>}
                        <div className="captcha-group" style={{"marginLeft":"20%"}}>
        <ReCAPTCHA sitekey="6Le-eywpAAAAAPeE6udVa56XZg3RGrgu8vLMBTZO" onChange={handleCaptchaChange} />
      </div>
					<div class="contact100-form-checkbox">
                    
					</div>
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" disabled={loading} va>
            {loading ? 'Loading...' : 'Login'}
						</button>
						<button class="login100-form-btn" onClick={()=>{navigation("/Registration")}} >Registration </button>
					</div>
                    {error?<div style={{"fontSize":"15px","color":"red","textAlign":"center","fontSize":"20px"}}>{errormessage}</div>:<span></span>}
				</form>
			</div>
		</div>
	</div>
	</div>
  );
};

export default Login;
