import React, { SyntheticEvent, useState } from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  MenuItem,
  Menu,
  Typography,
  IconButton,
  Avatar,
  Switch,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { ReactComponent as Goldilocks } from '../../assets/goldilocks.svg';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: '#8b98de',
  },
  icons: {
    marginLeft: 7,
    marginRight: 7,
    maxHeight: 35,
    maxWidth: 35,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: 35,
    marginRight: 5,
  },
});

interface AuthProps {
  handleLogin: [React.Dispatch<React.SetStateAction<boolean>>],
  toggleMode: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const Navbar: React.FC<AuthProps> = ({
  handleLogin: [setAuth],
  toggleMode: [darkMode, setDarkMode],
}): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [pic] = useState(localStorage.profilePhoto);
  const [int] = useState(localStorage.firstName[0]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      localStorage.clear();
      handleClose();
      setAuth(false);
      toast.success('Successfully logged out!');
    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <div className="toggle-container">
      <AppBar className={classes.root} position="static">
        <Toolbar variant="dense">
          <Goldilocks className={classes.logo} />
          <Typography component={Link} to="/" color="inherit">
            <img src={logo} alt="logo" className={classes.logo} />
          </Typography>
          {/* <Button component={Link} to="/" color="inherit">Dashboard</Button> */}
          <div className={classes.grow} />
          <IconButton component={Link} to="/view-searches" color="inherit">
            <SearchIcon className="icon" />
          </IconButton>
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={(e) => handleClick(e)}
          >
            <MenuIcon className="icon" />
          </IconButton>
          <Menu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem
              component={Link}
              to="/view-messages"
              color="inherit"
              onClick={handleClose}
            >
              Messages
            </MenuItem>
            {/* <MenuItem>
              Manage Listing
            </MenuItem> */}
            <MenuItem
              component={Link}
              to="/view-swaps"
              color="inherit"
              onClick={handleClose}
            >
              View swaps
            </MenuItem>
            <MenuItem
              component={Link}
              to="/view-calendar"
              color="inherit"
              onClick={handleClose}
            >
              Set availability
            </MenuItem>
            <MenuItem
              component={Link}
              to="/view-bulletins"
              color="inherit"
              onClick={handleClose}
            >
              Bulletin board
            </MenuItem>
            <MenuItem
              component={Link}
              to="/view-invites"
              color="inherit"
              onClick={handleClose}
            >
              Invite friends
            </MenuItem>
            <MenuItem
              component={Link}
              to="/invite"
              color="inherit"
              onClick={(e: React.SyntheticEvent<Element, Event>) => logout(e)}
            >
              Logout
            </MenuItem>
          </Menu>
          <NavLink
            to="/view-profile"
          >
            <Avatar
              className={classes.icons}
              alt={int}
              src={pic}
            />
          </NavLink>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode((prevMode: boolean) => !prevMode)}
            name="toggleMode"
            inputProps={{ 'aria-label': 'toggle between light and dark mode' }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
