import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser, updateUserAsync } from '../store/userSlice';

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
      {/* {user && user.id === id ? ( */}
        <div>
          <h1>User Information</h1>
          <div key={user.id}>
            <div>
              <h2>Username: {user.username}</h2>
              <img src={user.imgurl} alt={user.userName} style={{ width: '100px', height: '100px' }} />
              <h3>
                Name: {user.firstname} {user.lastname}
              </h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
            {editMode ? (
              <div>
                <input type="text" name="userName" value={updatedUser.username} onChange={handleInputChange} />
                <input type="text" name="role" value={updatedUser.role} onChange={handleInputChange} />
                <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
                <input type="text" name="firstname" value={updatedUser.firstname} onChange={handleInputChange} />
                <input type="text" name="lastname" value={updatedUser.lastname} onChange={handleInputChange} />
                <input type="text" name="industry" value={updatedUser.industry} onChange={handleInputChange} />
                <input type="text" name="location" value={updatedUser.location} onChange={handleInputChange} />
                <input type="text" name="locationpreference" value={updatedUser.locationpreference} onChange={handleInputChange} />
                <input type="number" name="salaryexpectation" value={updatedUser.salaryexpectation} onChange={handleInputChange} />
                <input type="text" name="jobstatus" value={updatedUser.jobstatus} onChange={handleInputChange} />
                <input type="text" name="joblevel" value={updatedUser.joblevel} onChange={handleInputChange} />
                <input type="text" name="jobseeking" value={updatedUser.jobseeking} onChange={handleInputChange} />
                <input type="number" name="yearsofexperience" value={updatedUser.yearsofexperience} onChange={handleInputChange} />
                <input type="text" name="educationlevel" value={updatedUser.educationlevel} onChange={handleInputChange} />
                <input type="text" name="languages" value={updatedUser.languages} onChange={handleInputChange} />
                <button onClick={handleUpdateUser}>Save</button>
              </div>
            ) : (
              <button onClick={() => setEditMode(true)}>Edit</button>
            )}
          </div>
        </div>
      {/* ) : (
        <p>Loading...</p>
      )} */}
    </>
  );
};

export default UserDetails;