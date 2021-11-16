import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';

const clientId = '411768487503-e06gsoh9etobrarghoagn8gbh6fjo7u8.apps.googleusercontent.com';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const onLoginSuccess = async (response) => {
    const res = await axios.post('http://localhost:8000/auth/google', {
      token: response.tokenId,
    });

    if (res.data) {
      console.log(res.data.email);
      setIsLogin(true);
    }
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setIsLogin(false);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <div>
          {!isLogin ? (
            <GoogleLogin
              clientId={clientId}
              buttonText='Sign In'
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={'single_host_origin'}
            />
          ) : (
            <GoogleLogout clientId={clientId} buttonText='Sign Out' onLogoutSuccess={onSignoutSuccess}></GoogleLogout>
          )}
        </div>

        <FacebookLogin appId='4460230900751107' autoLoad={true} fields='name,email,picture' callback={responseFacebook} />
      </header>
    </div>
  );
}

export default App;
