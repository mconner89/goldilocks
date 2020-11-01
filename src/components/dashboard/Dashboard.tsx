import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import { createGenerateClassName } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../global/Navbar';

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Dashboard: React.FC<AuthProps> = ({ handleLogin: [isAuthenticated, setAuth] }) => {
  const userEmail = 'khellstorm@gmail.com';
  const userId = 1;
  const listingId = 1;
  const userName = 'Kyle';
  const [randomListings, setRandomListings] = useState<any>([]);
  const [shownListing, setShownListing] = useState<any>([]);
  const [swapCount, setSwapCount] = useState(0);
  const [pendingRequestCount, setPendingRequestCount] = useState(0);

  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/dashboard/', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await response.json();
      setUserName(parseData.first_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Successfully logged out!');
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect(() => {
  //   getProfile();
  const getDashboardInfo = () => {
    axios.get('/dashboardInfo', {
      params: {
        userId,
        listingId,
      },
    })
      .then((results) => {
        const { data } = results;
        setSwapCount(data.confirmedSwapCount);
        setPendingRequestCount(data.pendingRequests.count);
        setRandomListings(data.openAvailabilities);
        console.log('swapCount:', swapCount);
        console.log('request count:', pendingRequestCount);
        console.log('random listings:', randomListings);
      });
  // };

  useEffect(() => {
    getDashboardInfo();
  }, []);

  return (
    <>
      Dashboard Page (Where the user arrives after logging in)
      <h4>
        Hello,
        {userName}
        !!
      </h4>
      <div id="user-notifications">
        User notifications go here
      </div>
      <div id="random-listing">
        <p>Wanna get away?</p>
        <p>
          There are
          {' '}
          {randomListings.length}
          {' '}
          open places. Here is one of them:
        </p>
        {'There is a listing you might like from some <random_location>'}
        {' '}
        {'from <start_date> until <end_date>'}
      </div>
      <button
        className="btn btn-success btn-block"
        type="submit"
        onClick={(e) => logout(e)}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
