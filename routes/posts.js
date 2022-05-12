const express = require('express');
const router = express.Router();

// accessing the posts controller
const postsController = require('../controllers/post_controller');

router.post('/create',postsController.create);
module.exports = router;