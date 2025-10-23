import './App.css';
import React, { Fragment } from 'react';
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';
import UserProfile from './components/userProfile';

function App() {
  return ( 
    <>
        <LoginButton/>
        <LogoutButton/>
      <ul>
        <UserProfile/>
      </ul>
    </>
  );
}

export default App;
