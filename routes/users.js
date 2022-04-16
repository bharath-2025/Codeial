const express = require('express');
const passport = require('passport');
const router = express.Router();

// accessing the users_controller
const usersController = require('../controllers/users_controller');
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/',usersController.home);

// routes request for the SignIn and SignUP pages
router.get('/signin',usersController.signin);
router.get('/signup',usersController.signup);

router.post('/create',usersController.create);

// use passport as middleware to authenticate.
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),usersController.createSession);

router.get('/signout',usersController.destroySession);


module.exports = router;