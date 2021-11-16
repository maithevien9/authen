import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

const clientId = '411768487503-e06gsoh9etobrarghoagn8gbh6fjo7u8.apps.googleusercontent.com';
function App() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const onLoginSuccess = async (response) => {
    const res = await axios.post('http://localhost:8000/auth/google', {
      token: response.tokenId,
    });

    if (res.data) {
      console.log(res.data.email);
      setShowloginButton(false);
      setShowlogoutButton(true);
    }
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <div>
          {showloginButton ? (
            <GoogleLogin
              clientId={clientId}
              buttonText='Sign In'
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          ) : null}

          {showlogoutButton ? (
            <GoogleLogout clientId={clientId} buttonText='Sign Out' onLogoutSuccess={onSignoutSuccess}></GoogleLogout>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
