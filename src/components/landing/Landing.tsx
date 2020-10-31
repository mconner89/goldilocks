import React from 'react';
import SignUp from './auth/Signup';

const Landing: React.FunctionComponent = (): JSX.Element => (
  <div className="Landing">
    <h1>Welcome to Goldilocks!</h1>
    <SignUp />
  </div>
);
export default Landing;
