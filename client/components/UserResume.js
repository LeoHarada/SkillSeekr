import React from 'react';
import axios from 'axios';

const UserResume = ({ id }) => {
  const handleDownloadResume = async () => {
    try {
      const response = await axios.get(`/api/uploads/${id}/resume`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf'); 
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div>
      <h3>User Resume</h3>
      <button onClick={handleDownloadResume}>Download Resume</button>
    </div>
  );
};

export default UserResume;
