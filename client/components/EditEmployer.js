import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSingleEmployer, updateEmployerAsync } from '../store/employerSlice';

const EditEmployer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employer = useSelector((state) => state.auth.me);
  const id = employer.id
  const [updatedEmployer, setUpdatedEmployer] = useState({ ...employer });

  useEffect(() => {
    dispatch(fetchSingleEmployer(id));
  }, [dispatch, id]);

  const handleUpdateEmployer = async () => {
    try {
      const token = localStorage.getItem('token');
      await dispatch(updateEmployerAsync({ token, id, employerData: updatedEmployer }));
      navigate(`/employers/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update employer:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployer((prevEmployer) => ({ ...prevEmployer, [name]: value }));
  };

  return (
    <>
        <div>
          <h1>Edit Profile Details</h1>
          <div key={employer.id}>
              <div>
                <p>Username: 
                  <input type="text" name="userName" value={updatedEmployer.username} onChange={handleInputChange} />
                </p>
                <p>Email: 
                  <input type="email" name="email" value={updatedEmployer.email} onChange={handleInputChange} />
                </p>
                <p>Firstname: 
                  <input type="text" name="firstname" value={updatedEmployer.firstname} onChange={handleInputChange} />
                </p>
                <p>Lastname: 
                  <input type="text" name="lastname" value={updatedEmployer.lastname} onChange={handleInputChange} />
                </p>
                <p>Industry: 
                  <input type="text" name="industry" value={updatedEmployer.industry} onChange={handleInputChange} />       
                </p>
                <p>Location: 
                  <input type="text" name="location" value={updatedEmployer.location} onChange={handleInputChange} />
                </p>
                <p>Company:
                  <input type="text" name="company" value={updatedEmployer.company} onChange={handleInputChange} />
                </p>
                <p>Languages:
                  <input type="text" name="languages" value={updatedEmployer.languages} onChange={handleInputChange} />
                </p>
                <button onClick={handleUpdateEmployer}>Save</button>
              </div>
          </div>
        </div>
    </>
  );
};

export default EditEmployer;