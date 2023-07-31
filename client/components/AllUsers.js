import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers, selectUsers } from "../store/userSlice";
import UserResume from './UserResume';

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectUsers);
    const viewUser = (id) => {
        navigate(`/users/${id}`)
    }

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <div>
            <h1>All Users</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <h3 onClick={() => viewUser(user.id)}> {user.firstName} {user.lastName} </h3>
                    <img src={user.imgurl} alt={user.firstname} style={{ width: '100px', height: '100px' }} />
                    <p>{user.location}</p>
                    <p>{user.jobseeking}</p>
                    <p>{user.industry}</p>
                    <p>{user.joblevel}</p>
                    <p>{user.educationlevel}</p>
                    <UserResume id={user.id}/>
                </div>
            ))}
        </div>   
    );
};

export default Users;