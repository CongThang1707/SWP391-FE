import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ChildrenList = ({ children, handleNavigateToChildDetail, handleOpenAddDialog, handleOpenEditDialog, handleDeleteChild }) => {
  const navigate = useNavigate();

  const handleAddChildClick = () => {
    if (children.length >= 2) {
      const membership = localStorage.getItem('membership');
      if (membership === 'DEFAULT') {
        localStorage.setItem('openSnackbar', 'true');
        navigate('/');
        return;
      }
    }
    handleOpenAddDialog();
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Children List
        </Typography>
        <IconButton onClick={handleAddChildClick} variant="contained" sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Add Child
          </Typography>
          <AddIcon sx={{ width: 20, height: 20 }} />
        </IconButton>
      </Box>

      {children.length > 0 ? (
        <Grid container spacing={1}>
          {children.map((child) => (
            <Grid item xs={12} sm={6} md={4} key={child.childrenId || Math.random()}>
              <Box
                sx={{
                  pl: 1,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <Box
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    textAlign: 'center',
                    width: '100%'
                  }}
                  onClick={() => handleNavigateToChildDetail(child.childrenId)}
                >
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    {child.childrenName || 'N/A'}
                  </Typography>
                </Box>

                <Box>
                  <IconButton color="primary" onClick={() => handleOpenEditDialog(child)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteChild(child.childrenId)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}>
          No children data available
        </Typography>
      )}
    </Box>
  );
};

export default ChildrenList;
