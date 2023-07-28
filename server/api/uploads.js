const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { models: { User }} = require('../db');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const id = req.params.id;
    const userUploadDir = path.join('uploads', 'users', id);
    fs.promises.mkdir(userUploadDir, { recursive: true });
    cb(null, userUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'resume-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

router.post('/:id', upload.single('resume'), async (req, res) => {
  try {
    const id = req.params.id;
    const resumeFilePath = req.file.path;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.resume = resumeFilePath;
    await user.save();

    res.json({ message: 'Resume uploaded successfully' });
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});

router.get('/:id/resume', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user || !user.resume) {
      return res.status(404).json({ error: 'User or resume not found' });
    }

    const resumeFilePath = path.join(__dirname, '..', '..', user.resume);
    res.sendFile(resumeFilePath);
  } catch (error) {
    console.error('Error sending resume:', error);
    res.status(500).json({ error: 'Failed to retrieve resume' });
  }
});

module.exports = router;