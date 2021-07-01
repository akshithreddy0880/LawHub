const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const lawyerModel = require('../Models/lawyer');
const {isAdmin} = require('../Middlewares/auth');

router.get('/lawyers', (req, res, next) => {
    let query = {isDeleted: false};
    let fields = {
        _id: 0, 
        username: 1, 
        email: 1,
        experience: 1,
        type: 1,
        lawyerId: 1,
        fee: 1,
        mobilenumber: 1
    }
    lawyerModel.find(query, fields)
        .then(lawyers => res.json(lawyers))
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

router.get('/lawyers/:id', (req, res) => {
    let query = {lawyerId: req.params.id};
    lawyerModel.findOne(query)
        .then(lawyer => res.json(lawyer))
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

module.exports = router;