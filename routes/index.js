const express = require('express');
const router = express.Router();
//console.log("Router loaded");


const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);


// for any further routes access from here
// creating middlewares to access the different routes such as users.js etc.. from the current root file ie, index.js.
// syntax:
// router.use('/routerName',require('./route file'));
router.use('/users',require('./users'));


module.exports = router;