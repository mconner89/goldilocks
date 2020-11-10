import React, { FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid, Container, Box, Button, makeStyles, IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { AppInterface } from 'goldilocksTypes';
import EditBio from './EditBio';

const useStyles = makeStyles({
  main: {
    border: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    align: 'center',
    justify: 'center',
  },
  buttonStyle: {
    padding: '5px 10px 10px',
    justifyContent: 'center',
    display: 'flex',
  },
  infoStyle: {
    border: 1,
    borderRadius: 2,
    position: 'relative',
    borderStyle: 'solid',
    justifyContent: 'center',
    width: '50%',
    marginTop: '5px',
    marginBottom: '5px',
    '&:hover': {
      '& $overlayStyle': {
        opacity: '1',
      },
    },
  },
  imgStyle: {
    height: '30%',
    width: '30%',
    padding: '10px 10px 5px',
  },
  overlayStyle: {
    color: 'black',
    position: 'absolute',
    bottom: '0',
    right: '0',
    opacity: '.25',
  },
  editStyle: {
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
});

// eslint-disable-next-line max-len
const UserProfileInfo: FunctionComponent<AppInterface> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState(user.userBio);
  const [tempBio, setTempBio] = useState(bio);
  const [hasListing, setHasListing] = useState(true);
  const [listingPhoto, setListingPhoto] = useState('');

  const getListingId = async () => {
    const listingId = await axios.get(`listing/user/${user.id}`)
      .then(({ data }) => {
        if (!data) {
          setHasListing(false);
          return 0;
        }
        return data.id;
      });
    if (listingId > 0) {
      await axios.get(`listingPhotos/${user.id}`)
        .then(({ data }) => {
          if (data) {
            setListingPhoto(data.url);
          }
        });
    }
  };

  useEffect(() => {
    getListingId();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (i: React.MouseEvent<HTMLButtonElement, MouseEvent>, check: boolean) => {
    if (check) {
      // save changes to DB
      axios.patch(`user/bio/${user.id}`, { params: { newBio: tempBio } });
      // update field on screen
      setBio(tempBio);
    }
    setOpen(false);
  };

  const handleClickOff = () => {
    setOpen(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTempBio(e.target.value);
  };

  const listingCheck = () => {
    if (!hasListing) {
      return (
        <>
          <Grid>
            It looks like you haven&apos;t made a listing one.
          </Grid>
          <Button>
            Create a listing
          </Button>
        </>
      );
    }
    if (!listingPhoto) {
      return (
        <>
          <Grid>
            It looks like there aren&apos;t any photos of your place yet.
          </Grid>
          <Button>
            Upload a photo
          </Button>
        </>
      );
    }
    return (
      <>
        <Grid container justify="center" item xs={12}>
          <img
            src={listingPhoto}
            alt="nobodys home"
            className={classes.imgStyle}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.buttonStyle}>
            <Button
              variant="contained"
              color="primary"
            >
              Update your listing
            </Button>
          </Box>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Container className={classes.main}>
        {listingCheck()}
        <Grid item xs={12}>
          <Container className={classes.infoStyle}>
            {bio}
            <IconButton className={classes.editStyle} onClick={handleOpen}>
              <EditIcon className={classes.overlayStyle} />
            </IconButton>
            <EditBio
              handleClose={handleClose}
              handleClickOff={handleClickOff}
              handleTextChange={handleTextChange}
              bio={bio}
              open={open}
            />
          </Container>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfileInfo;
