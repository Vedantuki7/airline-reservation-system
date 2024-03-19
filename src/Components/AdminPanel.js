import React, { useState } from 'react';
import { Box } from '@mui/material';
import AdminPanelFlights from './AdminPanelFlights';
import AdminPanelUsers from './AdminPanelUsers';
import airplaneBackground from '../assets/airplaneBackground.webp';
import NavigationLogout from './NavigationLogout';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('flights');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ backgroundImage: `url(${airplaneBackground})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <NavigationLogout isAdmin={true}/>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          width: '90%', 
          maxWidth: '1800px', 
        }}
      >
        <div>
          <button onClick={() => handleTabChange('flights')}>Flights</button>
          <button onClick={() => handleTabChange('users')}>Users</button>
        </div>
        {activeTab === 'flights' && <AdminPanelFlights />}
        {activeTab === 'users' && <AdminPanelUsers />}
      </Box>
    </div>
  );
}

export default AdminPanel;
