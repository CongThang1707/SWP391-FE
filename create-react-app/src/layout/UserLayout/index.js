import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Outlet, useNavigate } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Appointments', path: '/appointment' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

const settings = [
  { name: 'Profile', path: '/profile' },
  { name: 'Account', path: '/account' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Logout', path: '/logout' }
];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userAvatar, setUserAvatar] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    // Kiểm tra userId từ localStorage để xác định đăng nhập hay chưa
    const userId = localStorage.getItem('userId');
    const avatarUrl = localStorage.getItem('avatar'); // Ảnh đại diện người dùng

    if (userId) {
      setIsLoggedIn(true);
      setUserAvatar(avatarUrl || 'https://source.unsplash.com/50x50/?portrait');
    }
  }, []);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#007bff',  
          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            {/* Logo */}
            <AdbIcon sx={{ mr: 1, color: 'white' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              MyBrand
            </Typography>

            {/* Menu Items */}
            <Box sx={{ flexGrow: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.path)}
                  sx={{
                    mx: 1,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Kiểm tra trạng thái đăng nhập */}
            {isLoggedIn ? (
              // Nếu đã đăng nhập → Hiển thị Avatar và Menu
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src={userAvatar} />
                  </IconButton>
                </Tooltip>
                <Menu sx={{ mt: '45px' }} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.name === 'Logout') {
                          handleLogout();
                        } else {
                          navigate(setting.path);
                        }
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              // Nếu chưa đăng nhập → Hiển thị nút Login & Register
              <Box>
                <Button onClick={() => navigate('/pages/login/login3')} sx={{ mx: 1, color: 'white', border: '1px solid white' }}>
                  Login
                </Button>
                <Button onClick={() => navigate('/pages/register/register3')} sx={{ mx: 1, color: 'white', border: '1px solid white' }}>
                  Register
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default ResponsiveAppBar;
