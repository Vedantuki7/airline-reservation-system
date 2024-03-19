import React, { useState, useEffect } from 'react';
import {
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
  } from '@mui/material';

function AdminPanelFlights() {
  const [flights, setFlights] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newFlight, setNewFlight] = useState({
    airline: '',
    departure: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: 0,
  });
  const [isEdit, setIsEdit] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTU0NzJkYzkyMDIwNzZjZGJmNSIsInVzZXJuYW1lIjoiMDAyMjA2NjI2IiwiaWF0IjoxNzA5NDEyNjk2LCJleHAiOjE3MTE1NzI2OTZ9.wqJgp9UVl-P7t8nqyNyWjV6OcAzOzTrsGZRADgGZ00E";

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/Flights', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const data = await response.json();
      setFlights(data.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/Flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newFlight),
      });
      if (response.ok) {
        fetchFlights();
        setOpenAddDialog(false);
      } else {
        console.error('Failed to add flight:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  const handleDeleteFlight = async (_id) => {
    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/Flights/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });
      if (response.ok) {
        fetchFlights();
      } else {
        console.error('Failed to delete flight:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  const handleUpdateFlight = async () => {
    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/Flights/${newFlight._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newFlight),
      });
      if (response.ok) {
        fetchFlights();
        setOpenAddDialog(false);
      } else {
        console.error('Failed to update flight:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  };

  const handleOpenAddDialog = () => {
    setIsEdit(false);
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleChangeNewFlight = (e) => {
    setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
  };

  const handleEditFlight = (flight) => {
    setNewFlight(flight);
    setIsEdit(true); 
    setOpenAddDialog(true);
  };

  return (
    <div>
      <Typography variant="h4">Admin Panel</Typography>
      <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>Add Flight</Button>

<Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
  <DialogTitle>{isEdit ? 'Update Flight' : 'Add New Flight'}</DialogTitle>
  <DialogContent>
    <TextField
      label="Airline"
      name="airline"
      value={newFlight.airline}
      onChange={handleChangeNewFlight}
      fullWidth
    />
    <TextField
      label="Departure"
      name="departure"
      value={newFlight.departure}
      onChange={handleChangeNewFlight}
      fullWidth
    />
    <TextField
      label="Destination"
      name="destination"
      value={newFlight.destination}
      onChange={handleChangeNewFlight}
      fullWidth
    />
    <TextField
      label="Departure Time"
      name="departureTime"
      value={newFlight.departureTime}
      onChange={handleChangeNewFlight}
      fullWidth
    />
    <TextField
      label="Arrival Time"
      name="arrivalTime"
      value={newFlight.arrivalTime}
      onChange={handleChangeNewFlight}
      fullWidth
    />
    <TextField
      label="Departure Date"
      name="departureDate"
      value={newFlight.departureDate}
      onChange={handleChangeNewFlight}
      fullWidth
    />
    <TextField
      label="Price"
      name="price"
      type="number"
      value={newFlight.price}
      onChange={handleChangeNewFlight}
      fullWidth
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAddDialog}>Cancel</Button>
    <Button onClick={isEdit ? handleUpdateFlight : handleAddFlight} color="primary">
      {isEdit ? 'Update' : 'Add'}
    </Button>
  </DialogActions>
</Dialog>


      <Typography variant="h5">Flight Listings</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flight Name</TableCell>
            <TableCell>Departure</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Departure Time</TableCell>
            <TableCell>Arrival Time</TableCell>
            <TableCell>Departure Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
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
              <TableCell>{flight.departureDate}</TableCell>
              <TableCell>{flight.price}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditFlight(flight)} color="primary">Edit</Button>
                <Button onClick={() => handleDeleteFlight(flight._id)} color="secondary">Delete</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminPanelFlights;
