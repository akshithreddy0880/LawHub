const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const lawyerModel = require('../Models/lawyer');
const {hashPassword} = require('../Utils/hash');
const {isAdmin} = require('../Middlewares/auth');
const {isAuthenticated,isNotAuthenticated} = require('../Middlewares/auth');

router.post('/register', isAuthenticated, isAdmin, (req, res, next) => {
    try {
        let {email} = req.body;
        lawyerModel.findOne({email})
            .then(lawyer => {
                if(lawyer) {
                    req.flash('error_msg','This email already exists');
                    return res.redirect('/lawyerRegister');
                } else {
                    let user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashPassword('lawyer'),
                        type: req.body.type,
                        fee: req.body.fee,
                        mobilenumber: req.body.mobilenumber
                    };
                    user.save()
                        .then(lawyer => {
                            let mailOptions = {
                                from: 'LawHub',
                                to: req.body.email,
                                subject: 'Account created',
                                html: `
                                <p>Hello ${lawyer.username},</p>
                                <p>Your account has been created by the admin. Use the below credentails to login to the website.</p>
                                <p>Email: ${lawyer.email}</p>
                                <p>Password: 'lawyer'</p>
                                <p>Note: You can reset your password using forgot password option.</p>
                                `
                            };
                            sendEmail(mailOptions);
                            req.flash('success_msg', 'Successfully registered');
                            return res.redirect('/');
                        })
                        .catch(err => {
                            console.error(err);
                            next(createError('Something went wrong'));
                        });
                }
            })
            .catch(err => {
                console.error(err);
                next(createError('Something went wrong'));
            });
    } catch(err) {
        console.error(err);
        next(createError(err));
    }
});

router.post('/login', isNotAuthenticated, (req, res) => {
    let {email, password, checkbox} = req.body;
    lawyerModel.findOne({email})
        .then(lawyer => {
            if(!lawyer) {
                req.flash('error_msg', 'User not exists');
                return res.redirect('/lawyerLogin');
            }
            bcrypt.compare(password, lawyer.password)
                .then(ok => {
                    if(ok) {
                        if(checkbox == 'on') process.env.SESSION_MAX_AGE = 43200000;
                        req.session.lawyer = lawyer;
                        req.flash('success_msg', 'Successfully loggedIn');
                        return res.redirect('/');
                    } else {
                        req.flash('error_msg', 'Incorrect password');
                        return res.redirect('/lawyerLogin');
                    }
                })
                .catch(err => {
                    console.error(err);
                    next(createError('Something went wrong'));
                });
        })
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

module.exports = router;