import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import airplaneBackground from '../assets/airplaneBackground.webp';
import NavigationLogout from './NavigationLogout';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function BookingPage() {
  const [flights, setFlights] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTU0NzJkYzkyMDIwNzZjZGJmNSIsInVzZXJuYW1lIjoiMDAyMjA2NjI2IiwiaWF0IjoxNzA5NDEyNjk2LCJleHAiOjE3MTE1NzI2OTZ9.wqJgp9UVl-P7t8nqyNyWjV6OcAzOzTrsGZRADgGZ00E";
  const [username,setUsername] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from');
  const to = queryParams.get('to');
  const departureDate = queryParams.get('departureDate');
  console.log(from+to+departureDate)
  const navigate = useNavigate();
  

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    const fetchData = async () => {
      try {
        const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/Flights', 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
        const data = await response.json();
        let filteredFlights = data.data;

      
        if (from && to && departureDate) {
          filteredFlights = filteredFlights.filter(flight => {
            return flight.departure === from &&
                   flight.destination === to &&
                   flight.departureDate === departureDate;
          });
        }

        setFlights(filteredFlights);
        console.log(filteredFlights);
      } catch (error) {
        console.error('Error fetching flights:', error);
        setFlights([]); 
      }
    };
    fetchData();
  }, [from, to, departureDate]);

  const handleBook = () => {
    const queryParams = `?from=${from}&to=${to}&departureDate=${departureDate}`;
    navigate(`/payment${queryParams}`);
    
  };

  return (
    <div style={{ backgroundImage: `url(${airplaneBackground})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <NavigationLogout name={username}  />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Available Flights</Typography>
        <TableContainer component={Paper} sx={{ width: '90%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Flight Name</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Departure</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Destination</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Departure Time</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Arrival Time</Typography></TableCell>
                <TableCell><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Price</Typography></TableCell>
                <TableCell></TableCell>{/* Empty cell for the Book button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.Fid}>
                  <TableCell>{flight.airline}</TableCell>
                  <TableCell>{flight.departure}</TableCell>
                  <TableCell>{flight.destination}</TableCell>
                  <TableCell>{flight.departureTime}</TableCell>
                  <TableCell>{flight.arrivalTime}</TableCell>
                  <TableCell>{flight.price}</TableCell>
                  <TableCell><Button variant="contained" color="primary" onClick={handleBook}>Book</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default BookingPage;
