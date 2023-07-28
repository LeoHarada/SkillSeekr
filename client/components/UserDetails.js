import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../store/userSlice';
import UserResume from './UserResume';

const UserDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const id = user.id

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  return (
    <>
        <div>
          <h1>Profile</h1>
          <div key={user.id}>
              <h2>Username: {user.username}</h2>
              <img src={user.imgurl} alt={user.username} style={{ width: '100px', height: '100px' }} />
              <h3>Name: {user.firstname} {user.lastname}</h3>
              <p>Role: {user.role}</p>
              <p>Email: {user.email}</p>
              <p>Industry: {user.industry}</p>
              <p>Location: {user.location}</p>
              <p>Looking for: Remote/Hybrid/On-site: {user.locationpreference}</p>
              <p>Salary Expectation: {user.salaryexpectation}</p>
              <p>Employed/Unemployed: {user.jobstatus}</p>
              <p>Seeking Position Level: {user.joblevel}</p>
              <p>Seeking Job: {user.jobseeking}</p>
              <p>Years of Experience: {user.yearsofexperience}</p>
              <p>Education Level: {user.educationlevel}</p>
              <p>Languages: {user.languages}</p>
          </div>
          <div>
            <UserResume id={id}/>
          </div>
        </div>
    </>
  );
};

export default UserDetails;