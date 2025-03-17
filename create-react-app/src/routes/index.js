import { useRoutes, Navigate } from 'react-router-dom';

// routes
import AdminRoutes from './AdminRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ParentRoutes from './ParentRoutes';
import DoctorRoutes from './DoctorRoutes';
import { Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '72px', color: '#ff1744' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: '16px', color: '#333' }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '32px', color: '#666' }}>
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{
          backgroundColor: '#3f51b5',
          padding: '10px 20px',
          borderRadius: '8px',
          textTransform: 'none',
          fontSize: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        Go Back
      </Button>
    </Container>
  );
};

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const userRole = localStorage.getItem('role');
  const isLoggedIn = !!localStorage.getItem('userId'); // Kiểm tra xem người dùng đã đăng nhập hay chưa

  const getRoutesForRole = (role) => {
    switch (role) {
      case 'Admin':
        return [AdminRoutes];
      case 'Parent':
        return [ParentRoutes];
      case 'Doctor':
        return [DoctorRoutes];
      default:
        return [];
    }
  };

  const routes = [
    ...AuthenticationRoutes,
    ...(isLoggedIn ? getRoutesForRole(userRole) : []),
    {
      path: '*',
      element: isLoggedIn ? <NotFound /> : <Navigate to="/pages/login/login3" />
    }
  ];

  // Return the routes with the 404 fallback
  return useRoutes(routes);
}
