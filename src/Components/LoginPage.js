import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import Navigation from './Navigation';
import airplaneBackground from '../assets/airplaneBackground.webp';

function LoginPage({onLogin}) {
  var validUser;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTU0NzJkYzkyMDIwNzZjZGJmNSIsInVzZXJuYW1lIjoiMDAyMjA2NjI2IiwiaWF0IjoxNzA5NDEyNjk2LCJleHAiOjE3MTE1NzI2OTZ9.wqJgp9UVl-P7t8nqyNyWjV6OcAzOzTrsGZRADgGZ00E";

  const handleLogin = async (e) => {
    
    e.preventDefault();
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/Users', 
      {method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
      const data = await response.json();
      const UserData= data.data;
      console.log(UserData);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    else {
      console.log(" email: "+email+" pass: "+password)
      console.log(UserData);
      validUser = UserData.find((Users) => Users.email === email && Users.password === password);
      onLogin(validUser.firstName);
      console.log(JSON.stringify(validUser));
      
      if(validUser && validUser.isAdmin)
      {
        navigate('/adminPanel')
      }
      else if(validUser)
      navigate('/dashboard');
      else{
        setError('Incorrect Email or Password');    
    setTimeout(function() {
      setError('');
    }, 1500);
  }
    
 }
} catch (error) {
      console.error('Error fetching destinations:', error);
       
  } 
};

  return (
    <div style={{ backgroundImage: `url(${airplaneBackground})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Navigation />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Box sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '8px' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mb: 2 }}>
            Login
          </Button>
          {error && <Typography variant="body1" color="error">{error}</Typography>}
        </Box>
      </Box>
    </div>
  );
}

export default LoginPage;

