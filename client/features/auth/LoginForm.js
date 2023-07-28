import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate, authenticateEmployer } from '../../app/store';

const LoginForm = ({ displayName }) => {
    const dispatch = useDispatch();
    const [role, setRole] = useState('Employee');
    const [userData, setUserData] = useState({
      // Set default employee data here
    });
    const [employerData, setEmployerData] = useState({
      // Set default employer data here
    });
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
  
      if (role === 'Employee') {
        dispatch(authenticate({ username, password, method: formName, userData }));
      } else if (role === 'Employer') {
        dispatch(authenticateEmployer({ username, password, method: formName, employerData }));
      }
    };
  
    const handleRoleChange = (evt) => {
      setRole(evt.target.value);
    };
  
    const handleUserDataChange = (evt) => {
      const { name, value } = evt.target;
      setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    };
  
    const handleEmployerDataChange = (evt) => {
      const { name, value } = evt.target;
      setEmployerData((prevEmployerData) => ({ ...prevEmployerData, [name]: value }));
    };
  
    return (
      <form onSubmit={handleSubmit} name="login">
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
          <label htmlFor="role">
            <small>Role</small>
          </label>
          <select name="role" value={role} onChange={handleRoleChange}>
            <option value="Employee">Employee</option>
            <option value="Employer">Employer</option>
          </select>
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
    );
  };
  
  export default LoginForm;