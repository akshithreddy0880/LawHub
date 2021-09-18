const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const lawyerModel = require('../Models/lawyer');
const {isAdmin} = require('../Middlewares/auth');
const {hashPassword} = require('../Utils/hash');
const {sendEmail} = require('../Utils/sendmail');
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

router.get('/lawyerRegister', isAuthenticated, isAdmin, (req, res) => {
    res.render('lawyerRegister', {title: 'Lawyer Registration', user: req.session.client || req.session.lawyer});
});

router.get('/forgot', isNotAuthenticated, (req, res) => {
    res.render('forgot', {title: 'Forgot Password', user: req.session.client || req.session.lawyer});
});

router.get('/resetpassword', (req, res) => {
    res.render('resetpassword', {title: 'Reset Password', user: req.session.client || req.session.lawyer});
});

router.get('/resetpassword/:token', (req, res) => {
    let token = req.params.token;
    jwt.verify(token, process.env.JWT_SECRECT, (err, client) => {
        if(err) {
            console.error(err);
            req.flash('error_msg', 'Your token has expired');
            return res.redirect('/lawyerLogin');
        }
        return res.redirect('/resetpassword');
    });
});

router.post('/forgot', (req, res) => { 
    let {email} = req.body;
    lawyerModel.findOne({email})
        .then(lawyer => {
            if(!lawyer) {
                req.flash('error_msg', 'Please enter the registered email')
                return res.redirect('/forgot');
            } else {
                let user = {
                    username: lawyer.username,
                    email: lawyer.email,
                    mobilenumber: lawyer.mobilenumber
                };
                let token = jwt.sign(user, process.env.JWT_SECRECT, {expiresIn: '15m'});
                let mailOptions = {
                    from: 'LawHub',
                    to: lawyer.email,
                    subject: 'Reset password',
                    html: `
                    <p>This token is valid upto 15 mins. Please click on the below link to create new password.</p>
                    <p>To reset your password <a href='${process.env.URL}/resetpassword/${token}'>click here</a></p>
                    `
                };
                sendEmail(mailOptions);
                req.flash('info_msg', 'Reset password link has sent to your main');
                return res.redirect('/clientLogin');
            }
        })
});

router.post('/resetpassword', (req, res, next) => {
    let {email, password, cpassword} = req.body;
    if(password!==cpassword) {
        req.flash('error_msg','Passwords are not matching');
        return res.redirect('/resetpassword');
    }
    password = hashPassword(password);
    lawyerModel.findOneAndUpdate({email}, {$set:{password: password}})
        .then(lawyer => {
            req.flash('success_msg', 'Successfully updated the password');
            return res.redirect('lawyerLogin');
        })
        .catch(err => {
            console.log(err);
            next(createError('Something went wrong'));
        });
})

router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy(err => {
        if(err) next(createError(err));
        else res.redirect('/');
    });
});

module.exports = router;