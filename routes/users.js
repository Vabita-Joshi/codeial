const express= require('express');

const router= express.Router();
const userController = require('../controllers/user_controllers');
const passport = require('passport')

console.log("router loaded for user");

router.get('/profile', userController.profile
);
//routes for sign up pages
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create', userController.create);

//use passport as middleware for auth
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), userController.createSession);


module.exports = router; 