import React from 'react';
import { Typography, Button, Container, Box, Grid, Paper } from '@mui/material';

const ParentLandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #1976D2, #42A5F5)',
          color: 'white',
          textAlign: 'center',
          p: 4
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Welcome to Our Landing Page!
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, maxWidth: '600px' }}>
          We provide the best services to help you grow. Join us today and experience innovation like never before.
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 3 }}>
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" fontWeight={700} mb={4}>
          Our Features
        </Typography>
        <Grid container spacing={4}>
          {['Fast', 'Reliable', 'Secure'].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center', boxShadow: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  {feature}
                </Typography>
                <Typography sx={{ mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ background: '#eee', py: 3, textAlign: 'center' }}>
        <Typography variant="body2">© 2025 MyBrand. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default ParentLandingPage;
