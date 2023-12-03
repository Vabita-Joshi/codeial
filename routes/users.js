const express= require('express');

const router= express.Router();
const userController = require('../controllers/user_controllers');
const passport = require('passport')
console.log("router loaded for user");

router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
//routes for sign up pages
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create', userController.create);

// use passport as middleware for auth
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), userController.createSession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'}), userController.createSession);

router.get('/sign-out', userController.destroySession);
module.exports = router; 