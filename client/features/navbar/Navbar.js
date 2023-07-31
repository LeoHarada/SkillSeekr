import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const role = useSelector((state) => state.auth.me.role);
  const id = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>SkillSeekr</h1>
      <h2>Where employers discover you</h2>
      <nav>
        {isLoggedIn ? (
          <div>
            {role === 'Employee' ? (
              <React.Fragment>
                <Link to="/home">Home</Link>
                <Link to={`/users/${id}`}>Profile</Link>
                <Link to={`/uploads/${id}`}>Upload Resume</Link>
                <Link to={`/users/${id}/edit`}>Edit Profile</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/employer-home">Employer Home</Link>
                <Link to={`/employers/${id}`}>Profile</Link>
                <Link to={`/employers/${id}/edit`}>Edit Profile</Link>
              </React.Fragment>
            )}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
