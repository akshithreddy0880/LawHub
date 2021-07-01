const express = require('express');
const router = express.Router();
const uuid = require('uuid');
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

router.get('/lawyers/:id', (req, res, next) => {
    let query = {lawyerId: req.params.id};
    lawyerModel.findOne(query)
        .then(lawyer => res.json(lawyer))
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

router.post('/lawyer/appointment/:id', (req, res, next) => {
    let query = {lawyerId: req.params.id};
    let {date,time} = req.body;
    let appointment = {
        bookingId: uuid.v1(),
        clientname: req.session.client.username,
        email: req.session.client.email,
        date: date, 
        timeslot: time,
    }
    model.findOneAndUpdate(query, {$addToSet: {appointments: appointment}})
        .then(() => console.log('Successfully booked'))
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

module.exports = router;