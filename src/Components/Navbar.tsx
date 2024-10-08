import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logoImage from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Providers/UserProvider';
import { serverUrl } from '../api';
import { theme } from '../theme/theme';

function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const isLoggedIn = !!localStorage.getItem('accessToken');

  React.useEffect(() => {
    navigateAccordingToLoggedInState();
  }, [isLoggedIn]);

  const navigateAccordingToLoggedInState = () => {
    if (!isLoggedIn) {
      navigate('/');
    }
    else {
      navigate('/searchRecipe');
    }
  }


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onAccountClick = () => {
    handleCloseUserMenu();
    navigate('/profile');
  }

  const onLogout = async () => {
    await logout();
    navigate('/');
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton onClick={() => navigateAccordingToLoggedInState()} sx={{ p: 0 }}>
              <img src={logoImage} alt="Logo" style={{ height: 50 }} />
            </IconButton>
          </Box>
          {isLoggedIn &&
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button
              onClick={() => navigate('/recipes')}
              sx={{
                my: 2, color: 'black', display: 'block', px: 3, py: 1,
                textTransform: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '20px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'primary.main'
                },
              }}
            >
              Recipes
            </Button>
            <Button
              onClick={() => navigate('/profile')}
              sx={{
                my: 2, color: 'black', display: 'block', px: 3, py: 1,
                textTransform: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '20px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'primary.main'
                },
              }}
            >
              Profile
            </Button>
            <Button
              onClick={() => navigate('/searchRecipe')}
              sx={{
                my: 2, color: 'black', display: 'block', px: 3, py: 1,
                textTransform: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '20px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'primary.main'
                },
              }}
            >
              Search
            </Button>
          </Box>
          }

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                  <Avatar sx={{ width: 40, height: 40, color: "white", backgroundColor: theme.palette.primary.main }} src={`${serverUrl}${user?.image}`}></Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={onAccountClick}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem onClick={onLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
