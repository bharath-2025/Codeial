const express = require('express');
const router = express.Router();

// accessing the users_controller
const usersController = require('../controllers/users_controller');
router.get('/profile',usersController.profile);
router.get('/',usersController.home);

module.exports = router;