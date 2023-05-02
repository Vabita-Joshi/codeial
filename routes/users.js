const express= require('express');

const router= express.Router();
const userController = require('../controllers/user_controllers');

console.log("router loaded for user");

router.get('/profile', userController.profile);


module.exports = router; 