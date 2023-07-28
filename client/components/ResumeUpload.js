import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const id = useSelector((state) => state.auth.me.id)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        setUploadMessage('Please select a file to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('resume', selectedFile);

      const response = await axios.post(`/api/uploads/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'Resume uploaded successfully') {
        setUploadMessage('Resume uploaded successfully.');
      } else {
        setUploadMessage('Failed to upload resume.');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      setUploadMessage('Failed to upload resume.');
    }
  };

  return (
    <div>
      <h1>Resume Upload</h1>
      <form>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload}>Upload Resume</button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </form>
    </div>
  );
};

export default ResumeUpload;
