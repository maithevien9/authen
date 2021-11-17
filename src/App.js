import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import { auth, facebookProvider, firebaseConfig } from './configs/base';

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

  console.log(firebaseConfig);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log({
          id: authUser.uid,
          name: authUser.displayName ? authUser.displayName : authUser.email,
          lastsignIn: authUser.metadata.lastSignInTime,
          verified: String(authUser.emailVerified),
          pic: authUser.photoURL
            ? authUser.photoURL
            : 'https://lh3.googleusercontent.com/ogw/ADea4I5bHBJbpIvco4Yh1ARth7_gu4dl_QnpyDAU0NW8=s32-c-mo',
        });
      }
    });
  }, []);

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

  const handleFacebook = () => {
    auth.signInWithPopup(facebookProvider);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <div onClick={handleFacebook}>login with facebook</div>

        {/* <div>
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

        <FacebookLogin appId='4460230900751107' fields='name,email,picture' callback={responseFacebook} /> */}
      </header>
    </div>
  );
}

export default App;
