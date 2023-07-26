import React from 'react';

const SignUpForm = ({ handleSubmit, displayName }) => {
    return (
        <form onSubmit={handleSubmit} name="signup">
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
                <label htmlFor="email">
                    <small>Email</small>
                </label>
                <input name="email" type="email" />
            </div>
            <div>
                <label htmlFor="role">
                    <small>Role</small>
                </label>
                <input name="role" type="role" />
            </div>
            <div>
                <label htmlFor="firstname">
                    <small>First name</small>
                </label>
                <input name="firstname" type="firstname" />
            </div>
            <div>
                <label htmlFor="lastname">
                    <small>Last name</small>
                </label>
                <input name="lastname" type="lastname" />
            </div>
            <div>
                <label htmlFor="industry">
                    <small>Industry</small>
                </label>
                <input name="industry" type="industry" />
            </div>
            <div>
                <label htmlFor="location">
                    <small>Location</small>
                </label>
                <input name="location" type="location" />
            </div>
            <div>
                <label htmlFor="locationpreference">
                    <small>Location preference</small>
                </label>
                <input name="locationpreference" type="locationpreference" />
            </div>
            <div>
                <label htmlFor="salaryexpectation">
                    <small>Salary expectation</small>
                </label>
                <input name="salaryexpectation" type="salaryexpectation" />
            </div>
            <div>
                <label htmlFor="jobstatus">
                    <small>Job status</small>
                </label>
                <input name="jobstatus" type="jobstatus" />
            </div>
            <div>
                <label htmlFor="joblevel">
                    <small>Job level</small>
                </label>
                <input name="joblevel" type="joblevel" />
            </div>
            <div>
                <label htmlFor="jobseeking">
                    <small>Job seeking</small>
                </label>
                <input name="jobseeking" type="jobseeking" />
            </div>
            <div>
                <label htmlFor="yearsofexperience">
                    <small>Years of experience</small>
                </label>
                <input name="yearsofexperience" type="yearsofexperience" />
            </div>
            <div>
                <label htmlFor="educationlevel">
                    <small>Education level</small>
                </label>
                <input name="educationlevel" type="educationlevel" />
            </div>
            <div>
                <label htmlFor="languages">
                    <small>Languages</small>
                </label>
                <input name="languages" type="languages" />
            </div>
            <div>
                <button type="submit">{displayName}</button>
            </div>
        </form>
    );
};

export default SignUpForm;