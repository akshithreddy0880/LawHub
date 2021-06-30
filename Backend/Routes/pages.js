const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/', (req, res) => {
    res.render('homepage', {title: 'Homepage', user: req.session.client || req.session.lawyer});
});

router.get('/clientLogin', (req, res) => {
    res.render('clientLogin', {title: 'Client Login', user: req.session.client || req.session.lawyer});
});

router.get('/lawyerLogin', (req, res) => {
    res.render('lawyerLogin', {title: 'Lawyer Login', user: req.session.client || req.session.lawyer});
});

router.get('/register', (req, res) => {
    res.render('register', {title: 'Client Registration', user: req.session.client || req.session.lawyer});
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) next(createError(err));
        else res.redirect('/');
    });
});

module.exports = router;