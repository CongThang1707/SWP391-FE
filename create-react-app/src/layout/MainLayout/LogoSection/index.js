import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase, Box, Typography } from '@mui/material';
import imageLogo from '../../../assets/images/logo.jpg';

// project imports
import config from 'config';
// import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <Box
        sx={{
          width: 50,
          height: 50,
          backgroundImage: `url(${imageLogo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
          mr: 2
        }}
      />
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
          color: '#2196F3',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        CHILDGROWTH
      </Typography>
    </ButtonBase>
  );
};

export default LogoSection;
