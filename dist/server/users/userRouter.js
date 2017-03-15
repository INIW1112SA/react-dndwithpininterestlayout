'use strict';
const router = require('express').Router();
const passport = require('passport');

let userController = require('./userController.js');

// Create new user
router.post('/login', passport.authenticate('local', {failureRedirect: '/'}),
    userController.logIn);

// Delete a user based on :id
router.post('/send', userController.sendEmail);
router.get('/getAllUserName', userController.getAllUserName);

// Update a user based on :id
router.post('/signup', userController.signUp);

router.get('/verify', userController.verifyEmail);

router.post('/checkuser', userController.checkUser);

router.get('/logout', userController.logOut);
// Update user watchingList
router.put('/saveToProfile', userController.saveToProfile);

// Get the user Following List
router.get('/viewFollowCard/:emailId', userController.viewFollowCard);

// Get the folloeing category
router.get('/', userController.viewFav);

router.get('/auth/facebook', passport.authenticate('facebook', {
        session: false,
        scope: 'email'
    }), userController.facebook);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/#/'})
    , userController.facebookCallBack);

router.get('/auth/instagram', passport.authenticate('instagram', {
        session: false
    }), userController.instagram);

router.get('/auth/instagram/callback',
    passport.authenticate('instagram', {failureRedirect: '/#/'})
    , userController.instagramCallBack);

router.get('/auth/google', passport.authenticate('google', {
    session: false,
    scope: ['email']
    }), userController.google);

router.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/#/'})
    , userController.googleCallBack);

router.post('/addCatagory', userController.addCategory);

router.get('/displayCatagory', userController.displayCatagory);

router.put('/updateIsNew/:emails', userController.updateIsNew);

router.put('/updateProfile/:emails', userController.updateProfile);

module.exports = router;
