import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AppType, UserType } from 'goldilocksTypes';

// Components
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/landing/auth/Signup';
import Login from './components/landing/auth/Login';
import Search from './components/search/Search';
import Listing from './components/listing/Listing';
import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/messages/Messages';
import Navbar from './components/global/Navbar';
import UserProfile from './components/profile/UserProfile';
import UserCalendar from './components/dashboard/availability/Calendar';
import Profile from './components/profile/Profile';
import Swaps from './components/dashboard/swaps/Swaps';
import Invite from './components/global/Invite';
import BulletinBoard from './components/bulletin/BulletinBoard';
import WriteAReview from './components/listing/WriteAReview';

toast.configure();

const App: FC = (): JSX.Element => {
  const [isAuth, setAuth] = useState(false);
  const [listingId, setListingId] = useState(0);
  const [user, setUser] = useState<AppType>({
    id: localStorage.userId,
    firstName: localStorage.firstName,
    guestRating: localStorage.guestRating,
    hostRating: localStorage.hostRating,
    inviteCount: localStorage.inviteCount,
    profilePhoto: localStorage.profilePhoto,
    pronouns: localStorage.pronouns,
    swapCount: localStorage.swapCount,
    userBio: localStorage.userBio,
    email: localStorage.email,
  });
  const [darkMode, setDarkMode] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/verify`, {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json();
      if (parseRes === true) {
        setAuth(true);
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
    axios.get(`listing/user/${user.id}`)
      .then(({ data }) => setListingId(data.id));
  }, [user]);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <BrowserRouter>
        <Navbar handleLogin={[isAuth, setAuth]} toggleMode={[darkMode, setDarkMode]} />
        <Switch>
          <Route
            exact
            strict
            path="/"
            render={() => (!isAuth ? (
              <Login handleLogin={[isAuth, setAuth]} setUser={setUser} />) : (
                <Redirect to="/dashboard" />
            ))}
          />
          <Route
            exact
            strict
            path="/register"
            render={() => (!isAuth ? (
              <SignUp handleLogin={[isAuth, setAuth]} />) : (
                <Redirect to="/dashboard" />
            ))}
          />
          <Route
            exact
            strict
            path="/dashboard"
            render={() => (isAuth ? (
              <Dashboard handleLogin={[isAuth, setAuth]} user={user} />) : (
                <Redirect to="/" />
            ))}
          />
          <Route
            exact
            strict
            path="/search"
            component={Search}
          />
          <Route
            exact
            path="/listing/:id"
            component={Listing}
          />
          <Route
            exact
            strict
            path="/messages"
            component={() => <Messages user={user} />}
          />
          <Route
            exact
            path="/profile"
            component={() => <UserProfile user={user} />}
          />
          <Route
            exact
            path="/hostProfile"
            component={Profile}
          />
          <Route
            exact
            path="/calendar"
            component={() => <UserCalendar user={user} listingId={listingId} />}
          />
          <Route
            exact
            path="/swaps"
            component={() => <Swaps user={user} />}
          />
          <Route
            exact
            path="/invite"
            component={Invite}
          />
          <Route
            exact
            path="/bulletins"
            component={BulletinBoard}
          />
          <Route
            exact
            path="/writeReview"
            component={WriteAReview}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
