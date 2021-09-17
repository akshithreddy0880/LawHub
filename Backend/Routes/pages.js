const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {isAdmin} = require('../Middlewares/auth');
const {isAuthenticated,isNotAuthenticated} = require('../Middlewares/auth');

router.get('/', (req, res) => {
    res.render('homepage', {title: 'Homepage', user: req.session.client || req.session.lawyer});
});

router.get('/clientLogin', isNotAuthenticated, (req, res) => {
    res.render('clientLogin', {title: 'Client Login', user: req.session.client || req.session.lawyer});
});

router.get('/lawyerLogin', isNotAuthenticated, (req, res) => {
    res.render('lawyerLogin', {title: 'Lawyer Login', user: req.session.client || req.session.lawyer});
});

router.get('/clientRegister', isNotAuthenticated, (req, res) => {
    res.render('clientRegister', {title: 'Client Registration', user: req.session.client || req.session.lawyer});
});

router.get('/lawyerRegister', isAdmin, (req, res) => {
    res.render('lawyerRegister', {title: 'Lawyer Registration', user: req.session.client || req.session.lawyer});
});

router.get('/forgot', isNotAuthenticated, (req, res) => {
    res.render('forgot', {title: 'Forgot Password', user: req.session.client || req.session.lawyer});
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy(err => {
        if(err) next(createError(err));
        else res.redirect('/');
    });
});

module.exports = router;