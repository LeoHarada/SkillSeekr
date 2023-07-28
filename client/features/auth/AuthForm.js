import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import SignUpForm from './EmployeeSignUpForm';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name }) => {
  const { error } = useSelector((state) => state.auth);

  return (
    <div>
          {name === 'login' ? (
            <LoginForm name="login" displayName="Login" />
          ) : (
            <SignUpForm displayName="Sign Up" />
          )}
        {error && <div> {error} </div>}
    </div>
  );
};

export default AuthForm;