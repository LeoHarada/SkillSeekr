import React from 'react';
import { useDispatch } from 'react-redux';

const EmployerSignUpForm = ({ displayName }) => {
    const dispatch = useDispatch();
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const employerData = {
        email: evt.target.email.value,
        role: evt.target.role.value,
        firstname: evt.target.firstname.value,
        lastname: evt.target.lastname.value,
        industry: evt.target.industry.value,
        location: evt.target.location.value,
        company: evt.target.company.value,
        languages: evt.target.languages.value,
      }
      dispatch(authenticateEmployer({ username, password, method: formName, employerData }));
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
                <label htmlFor="company">
                    <small>Company</small>
                </label>
                <input name="company" type="text" />
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

export default EmployerSignUpForm;