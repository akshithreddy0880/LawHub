const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const lawyerModel = require('../Models/lawyer');

router.post('/login', (req, res) => {
    let {email, password} = req.body;
    lawyerModel.findOne({email})
        .then(lawyer => {
            if(!lawyer) {
                req.flash('error_msg', 'User not exists');
                return res.redirect('/lawyerLogin');
            }
            bcrypt.compare(password, lawyer.password)
                .then(ok => {
                    if(ok) {
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