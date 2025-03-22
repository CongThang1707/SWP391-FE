import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  CardMedia,
  Snackbar,
  Alert
} from '@mui/material';
import { CheckCircle, Facebook, Twitter, Instagram } from '@mui/icons-material';
import submitOrder from '../../../service/vnpay_services/get_vnpay.js';
import { useNavigate } from 'react-router-dom';
import imageSrc from '../../../assets/images/doctor_banner.jpg';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { getAllMembership } from '../../../service/membership_services/get_membership.js';

const ParentLandingPage = () => {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const data = await getAllMembership();
        console.log('Fetched Memberships:', data);
        setMemberships(data);
      } catch (error) {
        console.error('Failed to fetch memberships:', error);
      }
    };

    fetchMemberships();

    const snackbarState = localStorage.getItem('openSnackbar');
    if (snackbarState === 'true') {
      setOpenSnackbar(true);
      localStorage.removeItem('openSnackbar');
    }
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleBuyNow = async (price, type) => {
    const userID = localStorage.getItem('userId');

    if (!userID) {
      alert('Please log in first!');
      return;
    }

    // You can now use price and type here
    console.log('Buying:', type, 'plan for', price);

    // ... (rest of your payment logic)
    await submitOrder(price, type);

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

  const gradients = [
    'linear-gradient(135deg, #43cea2, #185a9d)',
    'linear-gradient(135deg, #ff512f, #dd2476)',
    'linear-gradient(135deg, #00c6ff, #0072ff)',
    'linear-gradient(135deg, #f7971e, #ffd200)',
    'linear-gradient(135deg, #8e2de2, #4a00e0)',
    'linear-gradient(135deg, #00b09b, #96c93d)'
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
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
            opacity: 1
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            mt: 20,
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '25px',
            padding: '5px',
            boxShadow: 'none',
            border: '2px solid black'
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
              fontSize: '16px'
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: 2,
              borderRadius: '25px',
              backgroundColor: '#007bff',
              color: 'white'
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
          {memberships.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={plan.membershipId || index}>
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
                    background: gradients[index % gradients.length],
                    color: 'white'
                  }}
                >
                  <Typography variant="h4" fontWeight={700}>
                    {plan.type}
                  </Typography>
                  <Typography variant="h3" fontWeight={700} sx={{ my: 2 }}>
                    ${plan.price.toFixed(0)}
                  </Typography>
                  {plan.description.split(',').map((desc, i) => (
                    <Typography
                      key={i}
                      sx={{
                        mt: 1,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <CheckCircle sx={{ mr: 1 }} /> {desc.trim()}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    sx={{
                      background: gradients[index % gradients.length],
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
                    onClick={
                      plan.type === 'DEFAULT' ? handleRegister : () => handleBuyNow(plan.price, plan.type) // Pass price and type here
                    }
                  >
                    {plan.type === 'DEFAULT' ? 'Register' : 'BUY NOW'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Meet Our Experts Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" fontWeight={700} mb={4}>
          Our Experts
        </Typography>
        <Grid container spacing={4}>
          {/* Doctor 1 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 20
                }
              }}
            >
              <CardMedia
                component="img"
                height="500"
                image="https://i.pinimg.com/474x/65/e6/3d/65e63de4b61d1b1faf76a7ffbfb0ec3f.jpg"
                alt="Dr. Johnny Sins"
              />
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                  Dr. Johnny Sins
                </Typography>
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  Tracking a child&#39;s growth is the foundation for ensuring their healthy future.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Doctor 2 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 20
                }
              }}
            >
              <CardMedia
                component="img"
                height="500"
                image="https://i.pinimg.com/474x/20/d9/e3/20d9e3acbbefb84d9691cb23d85c63a5.jpg"
                alt="Dr. Emily Brown"
              />
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                  Dr. Emily Brown
                </Typography>
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  Every child is unique — accurate growth tracking helps us unlock their potential.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Doctor 3 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 20
                }
              }}
            >
              <CardMedia
                component="img"
                height="500"
                image="https://i.pinimg.com/474x/64/c0/d0/64c0d0e31da8d737ab8d725636a98dd9.jpg"
                alt="Dr. Michael Lee"
              />
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                  Dr. Michael Lee
                </Typography>
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  Growth data isn&#39;s just numbers — it&#39;s the story of a child&#39;s journey to health.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ background: '#333', py: 4, color: 'white', padding: '3rem' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                About Us
              </Typography>
              <Typography variant="body2" color={'white'} fontSize={15}>
                We are a system dedicated to tracking child growth and development. Our platform helps parents and healthcare professionals
                monitor important growth metrics, ensuring children grow up healthy and strong.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                Contact
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color={'white'} fontSize={15}>
                  Email: tienvnse183132@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalPhoneOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color={'white'} fontSize={15}>
                  Phone: 094-424-6472
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color={'white'} fontSize={15}>
                  Address: Thu Duc City, Ho Chi Minh City, Vietnam
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': { color: '#3b5998' }
                  }}
                  component="a"
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontSize={15} color={'white'}>
                    Facebook
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': { color: '#1DA1F2' }
                  }}
                  component="a"
                  href="https://www.twitter.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontSize={15} color={'white'}>
                    Twitter
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': { color: '#C13584' }
                  }}
                  component="a"
                  href="https://www.instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontSize={15} color={'white'}>
                    Instagram
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider sx={{ borderColor: '#424242' }} />
      {/* Copyright footer */}
      <Box sx={{ background: '#333', py: 2, textAlign: 'center', color: 'white', padding: '2rem' }}>
        <Typography variant="body2" color={'white'} fontSize={15}>
          © 2025 CHILDGROWTH. CHILD DEVELOPMENT IS A TOP PRIORITY.
        </Typography>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%', color: 'red' }}>
          You are not a member. Please purchase a membership package.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ParentLandingPage;
