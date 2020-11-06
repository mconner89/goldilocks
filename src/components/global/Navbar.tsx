import React, { SyntheticEvent, useState } from 'react';
import {
  makeStyles, Typography, AppBar, Toolbar, Button, MenuItem, Menu, IconButton, Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: '7px',
  },
});

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Navbar: React.FC<AuthProps> = ({ handleLogin: [isAuthenticated, setAuth] }): JSX.Element => {
  const classes = useStyles();
  const [isUserAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = (event: SyntheticEvent) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography component={Link} to="/dashboard" variant="h3" color="inherit">
            🛏
          </Typography>
          <Button component={Link} to="/" color="inherit">HOME</Button>
          <Button component={Link} to="/search" color="inherit" className={classes.title}>SEARCH</Button>
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e)}
          >
            <MenuIcon />
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
            <MenuItem component={Link} to="/profile" color="inherit" onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem>
              Manage Listing
            </MenuItem>
            <MenuItem component={Link} to="/swaps" color="inherit" onClick={handleClose}>
              View swaps
            </MenuItem>
            <MenuItem component={Link} to="/calendar" color="inherit" onClick={handleClose}>
              Set availability
            </MenuItem>
            <MenuItem component={Link} to="/invite" color="inherit" onClick={handleClose}>
              Invite friends
            </MenuItem>
          </Menu>
          <Avatar className={classes.avatar}>
            BH
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
