// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { Outlet } from 'react-router';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//             <Typography
//               variant="h6"
//               noWrap
//               component="a"
//               href="#app-bar-with-responsive-menu"
//               sx={{
//                 mr: 2,
//                 display: { xs: 'none', md: 'flex' },
//                 fontFamily: 'monospace',
//                 fontWeight: 700,
//                 letterSpacing: '.3rem',
//                 color: 'inherit',
//                 textDecoration: 'none'
//               }}
//             >
//               LOGO
//             </Typography>

//             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleOpenNavMenu}
//                 color="inherit"
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{
//                   vertical: 'bottom',
//                   horizontal: 'left'
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'left'
//                 }}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//                 sx={{ display: { xs: 'block', md: 'none' } }}
//               >
//                 {pages.map((page) => (
//                   <MenuItem key={page} onClick={handleCloseNavMenu}>
//                     <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//             <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//             <Typography
//               variant="h5"
//               noWrap
//               component="a"
//               href="#app-bar-with-responsive-menu"
//               sx={{
//                 mr: 2,
//                 display: { xs: 'flex', md: 'none' },
//                 flexGrow: 1,
//                 fontFamily: 'monospace',
//                 fontWeight: 700,
//                 letterSpacing: '.3rem',
//                 color: 'inherit',
//                 textDecoration: 'none'
//               }}
//             >
//               LOGO
//             </Typography>
//             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//               {pages.map((page) => (
//                 <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
//                   {page}
//                 </Button>
//               ))}
//             </Box>
//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: '45px' }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right'
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right'
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 {settings.map((setting) => (
//                   <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                     <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//       <Outlet />
//     </>
//   );
// }
// export default ResponsiveAppBar;

// // import { useDispatch, useSelector } from 'react-redux';
// // import { Outlet } from 'react-router-dom';

// // // material-ui
// // import { styled, useTheme } from '@mui/material/styles';
// // import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// // // project imports
// // import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
// // import Header from './Header';
// // import Sidebar from './Sidebar';
// // import Customization from '../Customization';
// // import navigation from 'admin-menu-items';
// // import { drawerWidth } from 'store/constant';
// // import { SET_MENU } from 'store/actions';

// // // assets
// // import { IconChevronRight } from '@tabler/icons-react';

// // // styles
// // const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
// //   ...theme.typography.mainContent,
// //   borderBottomLeftRadius: 0,
// //   borderBottomRightRadius: 0,
// //   transition: theme.transitions.create(
// //     'margin',
// //     open
// //       ? {
// //           easing: theme.transitions.easing.easeOut,
// //           duration: theme.transitions.duration.enteringScreen
// //         }
// //       : {
// //           easing: theme.transitions.easing.sharp,
// //           duration: theme.transitions.duration.leavingScreen
// //         }
// //   ),
// //   [theme.breakpoints.up('md')]: {
// //     marginLeft: open ? 0 : -(drawerWidth - 20),
// //     width: `calc(100% - ${drawerWidth}px)`
// //   },
// //   [theme.breakpoints.down('md')]: {
// //     marginLeft: '20px',
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     padding: '16px'
// //   },
// //   [theme.breakpoints.down('sm')]: {
// //     marginLeft: '10px',
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     padding: '16px',
// //     marginRight: '10px'
// //   }
// // }));

// // // ==============================|| MAIN LAYOUT ||============================== //

// // const MainLayout = () => {
// //   const theme = useTheme();
// //   const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
// //   // Handle left drawer
// //   const leftDrawerOpened = useSelector((state) => state.customization.opened);
// //   const dispatch = useDispatch();
// //   const handleLeftDrawerToggle = () => {
// //     dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
// //   };

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />
// //       {/* header */}
// //       <AppBar
// //         enableColorOnDark
// //         position="fixed"
// //         color="inherit"
// //         elevation={0}
// //         sx={{
// //           bgcolor: theme.palette.background.default,
// //           transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
// //         }}
// //       >
// //         <Toolbar>
// //           <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
// //         </Toolbar>
// //       </AppBar>

// //       {/* drawer */}
// //       <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

// //       {/* main content */}
// //       <Main theme={theme} open={leftDrawerOpened}>
// //         {/* breadcrumb */}
// //         <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
// //         <Outlet />
// //       </Main>
// //       <Customization />
// //     </Box>
// //   );
// // };

// // export default MainLayout;

import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
// import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from '@mui/icons-material/Adb';
import { Outlet } from 'react-router';

const pages = ['Home', 'Appointments', 'Blog', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
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
                textDecoration: 'none'
              }}
            >
              MyBrand
            </Typography>

            {/* Menu Items */}
            <Box sx={{ flexGrow: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    mx: 1,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Avatar & User Menu */}
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="https://source.unsplash.com/50x50/?portrait" />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: '45px' }} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default ResponsiveAppBar;
