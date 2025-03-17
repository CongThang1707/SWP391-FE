import React from 'react';
import { Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WcIcon from '@mui/icons-material/Wc';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ChildrenList from './ChildrenList';

const UserInfo = ({ user, children, handleNavigateToChildDetail, handleOpenAddDialog, handleOpenEditDialog, handleDeleteChild }) => {
  const role = localStorage.getItem('role');
  return (
    <>
      <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
          User Information
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 1 }} />
          {user.username || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mt: 1 }}>
          <EmailIcon sx={{ mr: 1 }} />
          Email: {user.email || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mt: 1 }}>
          <PhoneIcon sx={{ mr: 1 }} />
          Phone: {user.phone || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mt: 1 }}>
          <WcIcon sx={{ mr: 1 }} />
          Gender: {user.gender || 'N/A'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mt: 1 }}>
          <HomeIcon sx={{ mr: 1 }} />
          Address: {user.address || 'N/A'}
        </Typography>
      </Box>

      {role !== 'Doctor' && (
        <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2 }}>
          <ChildrenList
            handleNavigateToChildDetail={handleNavigateToChildDetail}
            handleOpenAddDialog={handleOpenAddDialog}
            handleOpenEditDialog={handleOpenEditDialog}
            handleDeleteChild={handleDeleteChild}
          >
            {children}
          </ChildrenList>
        </Box>
      )}
    </>
  );
};

export default UserInfo;
