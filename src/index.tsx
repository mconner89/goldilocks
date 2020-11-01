import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Landing from './components/landing/Landing';
import Login from './components/landing/auth/Login';
import SignUp from './components/landing/auth/Signup';
import UserCalendar from './components/dashboard/availability/Calendar';

const userA = [{
  start: '2020-12-06',
  end: '2020-12-09',
  title: 'Availability',
  display: 'background',
}];

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
