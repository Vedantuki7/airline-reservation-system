import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationLogout = ({ isAdmin, name }) => {
  const handlelogout = () => {
    localStorage.clear();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vedant Airways
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {isAdmin ? `Hello, Admin!` : `Hello, ${name}`}
        </Typography>
        <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
        {!isAdmin && (
          <Button color="inherit" component={Link} to="/dashboard">
            Home
          </Button>
        )}
        <Button color="inherit" component={Link} to="/" onClick={handlelogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationLogout;
