import React, { useState } from 'react';
import EmployeeSignUpForm from './EmployeeSignUpForm';
import EmployerSignUpForm from './EmployerSignUpForm';

const SignUpForm = () => {
  const [selectedRole, setSelectedRole] = useState('employee');

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <div>
      {/* Your navbar or toggle buttons to select the role */}
      <button onClick={() => handleRoleChange('employee')}>Sign Up as Employee</button>
      <button onClick={() => handleRoleChange('employer')}>Sign Up as Employer</button>

      {selectedRole === 'employee' ? <EmployeeSignUpForm displayName="Sign Up" /> : null}
      {selectedRole === 'employer' ? <EmployerSignUpForm displayName="Sign Up" /> : null}
    </div>
  );
};

export default SignUpForm;