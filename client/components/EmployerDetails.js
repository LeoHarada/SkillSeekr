import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleEmployer } from '../store/employerSlice';

const EmployerDetails = () => {
  const dispatch = useDispatch();
  const employer = useSelector((state) => state.auth.me);
  const id = employer.id

  useEffect(() => {
    dispatch(fetchSingleEmployer(id));
  }, [dispatch, id]);

  return (
    <>
        <div>
          <h1>Profile</h1>
          <div key={employer.id}>
              <h2>Username: {employer.username}</h2>
              <img src={employer.imgurl} alt={employer.username} style={{ width: '100px', height: '100px' }} />
              <h3>Name: {employer.firstname} {employer.lastname}</h3>
              <p>Role: {employer.role}</p>
              <p>Email: {employer.email}</p>
              <p>Industry: {employer.industry}</p>
              <p>Location: {employer.location}</p>
              <p>Company: {employer.company}</p>
              <p>Languages: {employer.languages}</p>
          </div>
        </div>
    </>
  );
};

export default EmployerDetails;