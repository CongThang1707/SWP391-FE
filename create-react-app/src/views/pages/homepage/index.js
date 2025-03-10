import React from 'react';
import { Typography, Button, Container, Box, Grid, Card, CardContent, CardActions } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import submitOrder from '../../../service/vnpay_services/get_vnpay.js';
import { useNavigate } from 'react-router-dom';
import imageSrc from '../../../assets/images/doctor_banner.jpg';

const ParentLandingPage = () => {
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    const userID = localStorage.getItem('userId');

    if (!userID) {
      alert('Please log in first!');
      return;
    }

    await submitOrder();

    const paymentUrl = localStorage.getItem('url');
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
    } else {
      alert('Payment URL not found! Please try again.');
    }
    navigate('/pages/login/login3', { replace: true });
    localStorage.clear();
  };

  const handleRegister = () => {
    navigate('/pages/register/register3', { replace: true });
  };

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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          p: 4,
          backgroundImage: `url(${imageSrc})`,
          transition: 'background-image 0.5s ease-in-out, opacity 0.5s ease-in-out',
          opacity: 0.9,
          '&:hover': {
            opacity: 1,
          }
        }}
      >
        <Box
          sx={{
            mt: 20, 
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',  
            borderRadius: '25px',
            padding: '5px', 
            boxShadow: 'none', 
            border: '2px solid black',  
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '10px',
              borderRadius: '25px',
              backgroundColor: 'white',  
              fontSize: '16px',  
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: 2,
              borderRadius: '25px',
              backgroundColor: '#007bff',  
              color: 'white', 
            }}
          >
            Tìm Kiếm
          </Button>
        </Box>
      </Box>

      {/* Pricing Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={4}
          sx={{ color: '#333', textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Payment
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: 'Basic',
              price: '$0.00',
              features: ['Feature 1', 'Feature 2', 'Feature 3'],
              buttonText: 'Register',
              onClick: handleRegister
            },
            {
              title: 'Premium',
              price: '$10.00',
              features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
              buttonText: 'BUY NOW',
              onClick: handleBuyNow
            }
          ].map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)'
                  }
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    background: index === 1 ? 'linear-gradient(135deg, #ff512f, #dd2476)' : 'linear-gradient(135deg, #43cea2, #185a9d)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h4" fontWeight={700}>
                    {plan.title}
                  </Typography>
                  <Typography variant="h3" fontWeight={700} sx={{ my: 2 }}>
                    {plan.price}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Per Month
                  </Typography>
                  {plan.features.map((feature, i) => (
                    <Typography key={i} sx={{ mt: 1, color: 'white', display: 'flex', alignItems: 'center' }}>
                      <CheckCircle sx={{ mr: 1 }} /> {feature}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    sx={{
                      background: index === 1 ? '#ff512f' : '#43cea2',
                      color: 'white',
                      borderRadius: '25px',
                      px: 4,
                      fontSize: '16px',
                      fontWeight: 'bold',
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        filter: 'brightness(1.2)',
                        transform: 'scale(1.05)'
                      }
                    }}
                    onClick={plan.onClick}
                  >
                    {plan.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" fontWeight={700} mb={4}>
          Our Features
        </Typography>
        <Grid container spacing={4}>
          {['Fast', 'Reliable', 'Secure'].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 4, textAlign: 'center', boxShadow: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  {feature}
                </Typography>
                <Typography sx={{ mt: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
              </Card>
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
