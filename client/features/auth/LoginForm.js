import React from 'react';
import { useDispatch } from 'react-redux';
import { authenticate, authenticateEmployer } from '../../app/store';

const LoginForm = ({ displayName }) => {
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const role = evt.target.role.value;

    if (role === 'Employee') {
      dispatch(authenticate({ role, username, password, method: formName }));
    } else if (role === 'Employer') {
      dispatch(authenticateEmployer({ role, username, password, method: formName }));
    } else {
      console.error('Invalid role selected:', role);
    }
  };

  return (
    <div>
      <h2>Employee Sign-in</h2>
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
          <input
            name="role"
            type="text"
            defaultValue="Employee"
          />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
