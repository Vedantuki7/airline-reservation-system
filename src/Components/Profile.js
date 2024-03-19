import { useReducer } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'; 
import airplaneBackground from '../assets/airplaneBackground.webp';
import React, { useState, useEffect } from 'react';

// const initialFormState = {
//   firstName: '',
//   lastName: '',
//   age: '',
//   address: '',
//   postalCode: '',
//   country: '',
//   phoneNumber: '',
//   email: '', 
//   password: '',
// };

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const Profile = () => {
  const [errors, setErrors] = React.useState({});
  const [users, setUsers] = useState();
  const navigate = useNavigate(); 
  const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTU0NzJkYzkyMDIwNzZjZGJmNSIsInVzZXJuYW1lIjoiMDAyMjA2NjI2IiwiaWF0IjoxNzA5NDEyNjk2LCJleHAiOjE3MTE1NzI2OTZ9.wqJgp9UVl-P7t8nqyNyWjV6OcAzOzTrsGZRADgGZ00E";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/Users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const currUser = users.find(user=>user.firstName==localStorage.getItem("username"));

  const initialFormState = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    age: currUser.age,
    address: currUser.address,
    postalCode: currUser.postalCode,
    country: currUser.country,
    phoneNumber: currUser.phoneNumber,
    email: currUser.email, 
    password: currUser.password,
  };
  const [formData, dispatch] = useReducer(formReducer, initialFormState);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let fieldValue = value;
    if (type === 'checkbox') {
      fieldValue = checked
        ? [...formData[name], value]
        : formData[name].filter((location) => location !== value);
    } else if (type === 'radio') {
      fieldValue = checked ? value : '';
    }
    dispatch({ type: 'UPDATE_FIELD', field: name, value: fieldValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;

    console.log('Form submitted:', formData);
   
      const postData = async () => {
        try {
          const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/Users/${currUser._id}`, 
          {method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(formData)
        });
          const data = await response.json();
          
          console.log(data.status);
        } catch (error) {
          console.error('Error fetching destinations:', error);
        }
      };
      postData();
    navigate('/login');
  };

  const formIsValid = () => {
    const formErrors = {};

    if (!formData.firstName.trim()) {
      formErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Last Name is required';
    }
    if (!formData.age.trim()) {
      formErrors.age = 'Age is required';
    }
    if (!formData.address.trim()) {
      formErrors.address = 'Address is required';
    }
    if (!formData.postalCode.trim()) {
      formErrors.postalCode = 'Postal Code is required';
    }
    if (!formData.country.trim()) {
      formErrors.country = 'Country is required';
    }
    if (!formData.phoneNumber.trim()) {
      formErrors.phoneNumber = 'Phone Number is required';
    }
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required'; 
    }
    if (!formData.password.trim()) {
      formErrors.password = 'Password is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return (
    <div style={{ backgroundImage: `url(${airplaneBackground})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Navigation />
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
          <Typography variant="h4" sx={{ mb: 3 }}>
            Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  error={!!errors.age}
                  helperText={errors.age}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  error={!!errors.postalCode}
                  helperText={errors.postalCode}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  error={!!errors.country}
                  helperText={errors.country}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
