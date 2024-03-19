import React, { useState, useEffect } from 'react';
import { parse, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FormControl,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import NavigationLogout from './NavigationLogout';
import airplaneBackground from '../assets/airplaneBackground.webp';

function Dashboard() {
  const [departureDate, setDepartureDate] = useState(null);
  const [username,setUsername] = useState("");
  const [returnDate, setReturnDate] = useState(null);
  const [tripType, setTripType] = useState('oneWay');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();
  const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTU0NzJkYzkyMDIwNzZjZGJmNSIsInVzZXJuYW1lIjoiMDAyMjA2NjI2IiwiaWF0IjoxNzA5NDEyNjk2LCJleHAiOjE3MTE1NzI2OTZ9.wqJgp9UVl-P7t8nqyNyWjV6OcAzOzTrsGZRADgGZ00E";

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    const fetchData = async () => {
      try {
        const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/Users', 
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
        const data = await response.json();
        setDestinations(data.data);
        console.log(data.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setDestinations([]);
      }
    };
    fetchData();
  }, []);

  const handleContinue = () => {
    if(departureDate)
    {
    const dateString = departureDate.toLocaleDateString('en-US');
    const parsedDate = parse(dateString, 'MM/dd/yyyy', new Date());
    const formattedDate = format(parsedDate, 'MM/dd/yyyy');
    console.log("here:"+formattedDate);
    const queryParams = `?from=${from}&to=${to}&departureDate=${formattedDate}`;
    navigate(`/booking${queryParams}`);
    }
    
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegistration = () => {
    navigate('/register');
  };

  const handleContinueAsGuest = () => {
    navigate('/booking')
  };

  return (
    <div style={{ backgroundImage: `url(${airplaneBackground})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <NavigationLogout name={username} /> 
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
            width: '75%',
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Flight Booking
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Departure Date"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {tripType === 'roundTrip' && (
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Return Date"
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: 'black' }}>Trip Type</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <MenuItem value="oneWay">One Way</MenuItem>
                  <MenuItem value="roundTrip">Round Trip</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                label="Passengers"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleContinue}>
                Continue
              </Button>
            </Grid>
          </Grid>

          <Dialog open={openPopup} onClose={handleClose}>
            <DialogTitle>Login Required</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please login to continue or proceed as a guest.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogin} color="primary">
                Login
              </Button>
              <Button onClick={handleRegistration} color="primary">
                New User Registration
              </Button>
              <Button onClick={handleContinueAsGuest} color="primary">
                Continue as Guest
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
