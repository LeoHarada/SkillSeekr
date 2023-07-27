import React from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

const SignUpForm = ({ displayName }) => {
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
        <form onSubmit={handleSubmit} name="signup">
            <div>
                <label htmlFor="username">
                    <small>Username</small>
                </label>
                <input name="username" type="text" />
            </div>
            <div>
                <label htmlFor="password">
                    <small>Password</small>
                </label>
                <input name="password" type="password" />
            </div>
            <div>
                <label htmlFor="email">
                    <small>Email</small>
                </label>
                <input name="email" type="email" />
            </div>
            <div>
                <label htmlFor="role">
                    <small>Role</small>
                </label>
                <input name="role" type="text" />
            </div>
            <div>
                <label htmlFor="firstname">
                    <small>First name</small>
                </label>
                <input name="firstname" type="text" />
            </div>
            <div>
                <label htmlFor="lastname">
                    <small>Last name</small>
                </label>
                <input name="lastname" type="text" />
            </div>
            <div>
                <label htmlFor="industry">
                    <small>Industry</small>
                </label>
                <input name="industry" type="text" />
            </div>
            <div>
                <label htmlFor="location">
                    <small>Location</small>
                </label>
                <input name="location" type="text" />
            </div>
            <div>
                <label htmlFor="locationpreference">
                    <small>Location preference</small>
                </label>
                <input name="locationpreference" type="text" />
            </div>
            <div>
                <label htmlFor="salaryexpectation">
                    <small>Salary expectation</small>
                </label>
                <input name="salaryexpectation" type="number" />
            </div>
            <div>
                <label htmlFor="jobstatus">
                    <small>Job status</small>
                </label>
                <input name="jobstatus" type="text" />
            </div>
            <div>
                <label htmlFor="joblevel">
                    <small>Job level</small>
                </label>
                <input name="joblevel" type="text" />
            </div>
            <div>
                <label htmlFor="jobseeking">
                    <small>Job seeking</small>
                </label>
                <input name="jobseeking" type="text" />
            </div>
            <div>
                <label htmlFor="yearsofexperience">
                    <small>Years of experience</small>
                </label>
                <input name="yearsofexperience" type="number" />
            </div>
            <div>
                <label htmlFor="educationlevel">
                    <small>Education level</small>
                </label>
                <input name="educationlevel" type="text" />
            </div>
            <div>
                <label htmlFor="languages">
                    <small>Languages</small>
                </label>
                <input name="languages" type="text" />
            </div>
            <div>
                <button type="submit">{displayName}</button>
            </div>
        </form>
    );
};

export default SignUpForm;