const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const {
  getApplications,
  getApplicationById,
  createApplication,
  createApplicationFromJob,
  updateApplication,
  deleteApplication
} = require('../controllers/applications.controller');

router.get('/', protect, getApplications);
router.get('/:id', protect, getApplicationById);
router.post('/', protect, createApplication);
router.post('/from-job/:jobId', protect, createApplicationFromJob);
router.put('/:id', protect, updateApplication);
router.delete('/:id', protect, deleteApplication);

module.exports = router;