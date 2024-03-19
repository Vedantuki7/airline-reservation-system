import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegistrationPage from './Components/RegistrationPage';
import AdminPanel from './Components/AdminPanel';
import BookingPage from './Components/BookingPage';
import Dashboard from './Components/Dashboard'; 
import Payment from './Components/Payment';
import Profile from './Components/Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setIsAuthenticated(true);
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogin = (name) => {
    console.log('user logged in with name: ', name);
    setIsAuthenticated(true);
    setUsername(name);
    localStorage.setItem('username', name); 
  };

  console.log('isAuthenticated:', isAuthenticated);
  console.log('username:', username);


  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<LoginPage onLogin={handleLogin}/>} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

