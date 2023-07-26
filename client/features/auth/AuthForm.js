import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const userData = {
      email: evt.target.email.value,
      role: evt.target.role.value,
      firstname: evt.target.firstname.value,
      lastname: evt.target.lastname.value,
      industry: evt.target.industry.value,
      location: evt.target.location.value,
      locationpreference: evt.target.locationpreference.value,
      salaryexpectation: evt.target.salaryexpectation.value,
      jobstatus: evt.target.jobstatus.value,
      joblevel: evt.target.joblevel.value,
      jobseeking: evt.target.jobseeking.value,
      yearsofexperience: evt.target.yearsofexperience.value,
      educationlevel: evt.target.educationlevel.value,
      languages: evt.target.languages.value,
    }
    dispatch(authenticate({ username, password, method: formName, userData }));
  };

  return (
    <div>
          {name === 'login' ? (
            <LoginForm handleSubmit={handleSubmit} name="login" displayName="Login" />
          ) : (
            <SignUpForm handleSubmit={handleSubmit} name="signup" displayName="Sign Up" />
          )}
        {error && <div> {error} </div>}
    </div>
  );
};

export default AuthForm;