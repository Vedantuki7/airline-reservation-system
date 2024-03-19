import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

function AdminPanelUsers() {
  const [error,setError]=useState("");
  const [users, setUsers] = useState([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isUserEdit, setIsUserEdit] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTM5MTU0NzJkYzkyMDIwNzZjZGJmNSIsInVzZXJuYW1lIjoiMDAyMjA2NjI2IiwiaWF0IjoxNzA5NDEyNjk2LCJleHAiOjE3MTE1NzI2OTZ9.wqJgp9UVl-P7t8nqyNyWjV6OcAzOzTrsGZRADgGZ00E";

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

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        setOpenAddUserDialog(false);
      } else {
        console.error('Failed to add user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (user) => {
    if(user.isAdmin)
      setError("Cannot Delete Admin");
    else
    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/Users/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/Users/${newUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        setOpenAddUserDialog(false);
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const handleOpenUserDialog = () => {
    setIsUserEdit(false);
    setOpenAddUserDialog(true);
  }

  const handleCloseUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setIsUserEdit(true);
    setOpenAddUserDialog(true);
  };

  const handleChangeUser = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };


  const renderUserRows = () => {
    return users.map((user) => (
      <TableRow key={user._id}>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.age}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell>{user.postalCode}</TableCell>
        <TableCell>{user.country}</TableCell>
        <TableCell>{user.phoneNumber}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.password}</TableCell>
        <TableCell>
          <Button onClick={() => handleEditUser(user)} color="primary">Edit</Button>
          <Button onClick={() => handleDeleteUser(user)} color="secondary">Delete</Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <Typography variant="h4">Admin Panel</Typography>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleOpenUserDialog}>Add User</Button>
  
      <Dialog open={openAddUserDialog} onClose={handleCloseUserDialog}>
        <DialogTitle>{isUserEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChangeUser}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChangeUser}
            fullWidth
          />
          <TextField
            label="Age"
            name="age"
            value={newUser.age}
            onChange={handleChangeUser}
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={newUser.address}
            onChange={handleChangeUser}
            fullWidth
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            value={newUser.postalCode}
            onChange={handleChangeUser}
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={newUser.country}
            onChange={handleChangeUser}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleChangeUser}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleChangeUser}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChangeUser}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Cancel</Button>
          <Button onClick={isUserEdit ? handleUpdateUser : handleAddUser} color="primary">{isUserEdit ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
  
      <Typography variant="h5">User Listings</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.postalCode}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditUser(user)} color="primary">Edit</Button>
                <Button onClick={() => handleDeleteUser(user)} color="secondary">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );  
}

export default AdminPanelUsers;
