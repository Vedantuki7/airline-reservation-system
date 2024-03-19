import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import airplaneBackground from '../assets/airplaneBackground.webp';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({});
    const [paymentSuccessDialogOpen, setPaymentSuccessDialogOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [flight, setFlight] = useState(null);
    const navigate = useNavigate();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTU0NzJkYzkyMDIwNzZjZGJmNSIsInVzZXJuYW1lIjoiMDAyMjA2NjI2IiwiaWF0IjoxNzA5NDEyNjk2LCJleHAiOjE3MTE1NzI2OTZ9.wqJgp9UVl-P7t8nqyNyWjV6OcAzOzTrsGZRADgGZ00E"; // Token for authorization
    const location = useLocation();
    
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from');
  const to = queryParams.get('to');
  const departureDate = queryParams.get('departureDate');
  var bookingData;
    
        const fetchUserData = async () => {
            try {
              const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/Users', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                }
              });
          
              if (!response.ok) {
                throw new Error('Failed to fetch user data');
              }
          
              const userData = await response.json();

              const username = localStorage.getItem("username");
              setUser(userData.data.find(user=>user.firstName==username));
              console.log('User data:', userData);
            
            } catch (error) {
              console.error('Error fetching user data:', error);
              
            }
          };

        
        const fetchFlightData = async () => {
            try {
                const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/Flights', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                  }
                });
            
                if (!response.ok) {
                  throw new Error('Failed to fetch user data');
                }
            
                const flightData = await response.json();
            
                setFlight(flightData.data.find(flight => flight.from === from && flight.to === to && flight.departureDate === departureDate));
                console.log('Flight data:', flightData);
                console.log(flight);
              } catch (error) {
                console.error('Error fetching flight data:', error);
              }
        };

       

    const handleConfirmPayment = async () => {

        if (cardNumber.length !== 12) {
            setErrors({ cardNumber: 'Enter a valid 12 digit number' });
            return;
        }

        if (nameOnCard.trim().length === 0 || nameOnCard.split(' ').length > 50) {
            setErrors({ nameOnCard: 'Enter a valid name (up to 50 words)' });
            return;
        }

        if (cvv.length !== 3) {
            setErrors({ cvv: 'Enter a valid 3 digit CVV' });
            return;
        }

        const submitdata =async ()=>{
            try {
                bookingData = {
                    user_id: user._id,
                    userName:user.email,
                    // flight_id: flight._id,
                    flight_from: from,
                    flight_to: to,
                    booking_date: new Date().toISOString()
        
                };
                const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/Booking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(bookingData)
                });
    
                if (!response.ok) {
                    throw new Error('Failed to confirm booking');
                }
    
                setPaymentSuccessDialogOpen(true);
            } catch (error) {
                console.error('Error confirming booking:', error.message);
            }
            
        };

        Promise.all([fetchUserData(), fetchFlightData()]).then(() => {
            
            console.log('Both user and flight data fetched');
            submitdata();
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
        
    
        }
        
    const handleCloseDialog = () => {
        setPaymentSuccessDialogOpen(false);
    };

    const handleReturnToHome = () => {
        navigate('/dashboard');
    };

    const handleCancelPayment = () => {
        navigate(`/booking?from=${from}&to=${to}&departureDate=${departureDate}`);
    };

    return (
        <div style={{
            backgroundImage: `url(${airplaneBackground})`,
            backgroundSize: 'cover',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box
                sx={{
                    p: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    width: '50%',
                }}
            >
                <Typography variant="h4" sx={{ mb: 4, color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Payment Details
                </Typography>
                <TextField
                    fullWidth
                    label="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    error={errors.cardNumber ? true : false}
                    helperText={errors.cardNumber || ''}
                />
                <TextField
                    fullWidth
                    label="Name on Card"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    error={errors.nameOnCard ? true : false}
                    helperText={errors.nameOnCard || ''}
                />
                <TextField
                    fullWidth
                    label="CVV"
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    error={errors.cvv ? true : false}
                    helperText={errors.cvv || ''}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    onClick={handleConfirmPayment}
                >
                    Confirm Payment
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '20px' }}
                    onClick={handleCancelPayment}
                >
                    Cancel Payment
                </Button>

                <Dialog open={paymentSuccessDialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>Payment Successful</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Your payment has been successfully processed.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleReturnToHome} color="primary">
                            Return to Home
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}

export default Payment;



