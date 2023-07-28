import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser, updateUserAsync } from '../store/userSlice';
import UserResume from './UserResume';

const UserDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const id = useSelector((state) => state.auth.me.id)
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await dispatch(updateUserAsync({ token, id, userData: updatedUser }));
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <>
        <div>
          <h1>User Details</h1>
          <div key={user.id}>
            <div>
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
            {editMode ? (
              <div>
                <p>Username: 
                  <input type="text" name="userName" value={updatedUser.username} onChange={handleInputChange} />
                </p>
                <p>Role: 
                  <input type="text" name="role" value={updatedUser.role} onChange={handleInputChange} />
                </p>
                <p>Email: 
                  <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
                </p>
                <p>Firstname: 
                  <input type="text" name="firstname" value={updatedUser.firstname} onChange={handleInputChange} />
                </p>
                <p>Lastname: 
                  <input type="text" name="lastname" value={updatedUser.lastname} onChange={handleInputChange} />
                </p>
                <p>Industry: 
                  <input type="text" name="industry" value={updatedUser.industry} onChange={handleInputChange} />       
                </p>
                <p>Location: 
                  <input type="text" name="location" value={updatedUser.location} onChange={handleInputChange} />
                </p>
                <p>Looking for Remote/Hybrid/On-site: 
                  <input type="text" name="locationpreference" value={updatedUser.locationpreference} onChange={handleInputChange} />
                </p>
                <p>Salary Expectation: 
                  <input type="number" name="salaryexpectation" value={updatedUser.salaryexpectation} onChange={handleInputChange} />
                </p>
                <p>Employed/Unemployed: 
                  <input type="text" name="jobstatus" value={updatedUser.jobstatus} onChange={handleInputChange} /> 
                </p>
                <p>Seeking Position Level: 
                  <input type="text" name="joblevel" value={updatedUser.joblevel} onChange={handleInputChange} />
                </p>
                <p>Seeking Job: 
                  <input type="text" name="jobseeking" value={updatedUser.jobseeking} onChange={handleInputChange} />
                </p>
                <p>Years of Experience: 
                  <input type="number" name="yearsofexperience" value={updatedUser.yearsofexperience} onChange={handleInputChange} />
                </p>
                <p>Education Level:
                  <input type="text" name="educationlevel" value={updatedUser.educationlevel} onChange={handleInputChange} />
                </p>
                <p>Languages:
                  <input type="text" name="languages" value={updatedUser.languages} onChange={handleInputChange} />
                </p>
                <button onClick={handleUpdateUser}>Save</button>
              </div>
            ) : (
              <button onClick={() => setEditMode(true)}>Edit</button>
            )}
          </div>
          <div>
            <UserResume id={id}/>
          </div>
        </div>
    </>
  );
};

export default UserDetails;