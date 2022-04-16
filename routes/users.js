const express = require('express');
const router = express.Router();

// accessing the users_controller
const usersController = require('../controllers/users_controller');
router.get('/profile',usersController.profile);
router.get('/',usersController.home);

// routes request for the SignIn and SignUP pages
router.get('/signin',usersController.signin);
router.get('/signup',usersController.signup);

router.post('/create',usersController.create);
router.post('/create_session',usersController.createSession);

module.exports = router;