import React from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

const LoginForm = ({ displayName }) => {
    const dispatch = useDispatch();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;

        dispatch(authenticate({ username, password, method: formName }));
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
                <button type="submit">{displayName}</button>
            </div>
        </form>
    );
};

export default LoginForm;