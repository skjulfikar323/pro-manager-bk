const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

router.get('/', protect, projectController.getAllProjects);
router.post('/', protect, projectController.createProject);
// Add other protected routes

module.exports = router;
