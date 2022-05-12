const express = require('express');
const passport  = require('passport');
const router = express.Router();

// accessing the posts controller
const postsController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postsController.create);
module.exports = router;