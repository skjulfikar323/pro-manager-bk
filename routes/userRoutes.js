const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userTask = require('../controllers/userTask');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/getAllTask', auth, userTask.getAllTask);
router.post('/getAllTaskById', auth, userTask.getAllTaskById);
router.post('/getAllTaskByDate', auth, userTask.getAllTaskByDate);
router.post('/createTask', auth, userTask.createTask);
router.post('/updateTask', auth, userTask.updateTask);
router.post('/deleteTask', auth, userTask.deleteTask);

router.get('/profile', auth, userController.getProfile);
router.post('/updateSetting', auth, userController.updateSetting);
router.post('/updateSetting', auth, userController.deleteUser);

module.exports = router;

