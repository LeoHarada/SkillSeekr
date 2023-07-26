import React from 'react';

const LoginForm = ({ handleSubmit, displayName }) => {
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