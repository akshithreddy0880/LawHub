const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const createError = require('http-errors');
const lawyerModel = require('../Models/lawyer');
const clientModel = require('../Models/client');
const {isAuthenticated} = require('../Middlewares/auth');
const {sendEmail} = require('../Utils/sendmail');

router.get('/lawyers', isAuthenticated, (req, res, next) => {
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

router.get('/lawyers/:id', isAuthenticated, (req, res, next) => {
    let query = {lawyerId: req.params.id};
    lawyerModel.findOne(query)
        .then(lawyer => res.json(lawyer))
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

router.post('/lawyer/appointment/:id', isAuthenticated, (req, res, next) => {
    let query = {lawyerId: req.params.id};
    let {date,time} = req.body;
    let appointment = {
        bookingId: uuid.v1(),
        clientname: req.session.client.username,
        email: req.session.client.email,
        date: date, 
        timeslot: time,
    }
    lawyerModel.findOneAndUpdate(query, {$addToSet: {appointments: appointment}})
        .then(() => console.log('Successfully booked'))
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

router.get('/clients', isAuthenticated, (req, res, next) => {
    let query = {isDeleted: false};
    let fields = {
        _id: 0, 
        username: 1, 
        email: 1,
    }
    clientModel.find(query, fields)
        .then(clients => res.json(clients))
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

router.get('/lawyer/appointments', isAuthenticated, (req, res, next) => {
    let query = {
        email: req.session.lawyer.email,
        isDeleted: false
    };
    let fields = {
        _id: 0, 
        appointments: 1
    }
    lawyerModel.find(query, fields)
        .then(appointments => res.json(appointments))
        .catch(err => {
            console.error(err);
            next(createError('Something went wrong'));
        });
});

router.patch('/acceptclient/:id', isAuthenticated, (req, res) => {
    let query = {lawyerId: req.session.lawyer.lawyerId};
    lawyerModel.updateOne(query, {$set: {'appointments.$[elem].accepted': true}}, {arrayFilters: [{'elem.bookingId': {$eq: req.params.id}}]})
        .then(user => {
            let mailOptions = {
                from: 'LawHub',
                to: req.body.email,
                subject: 'Verified your email',
                html: `
                <p>Your request has been confirmed. Please meet the lawyer at your choosed time and date.</p>
                `
            };
            sendEmail(mailOptions);
        })
        .catch(err => console.error(err));
});

router.patch('/rejectclient/:id', isAuthenticated, (req, res) => {
    let query = {lawyerId: req.session.lawyer.lawyerId};
    lawyerModel.updateOne(query, {$pull: {appointments: {bookingId: req.params.id}}})
        .then(user => {
            let mailOptions = {
                from: 'LawHub',
                to: req.body.email,
                subject: 'Verified your email',
                html: `
                <p>Your request has not accepted by the lawyer. Please try to find another lawyer.</p>
                `
            };
            sendEmail(mailOptions);
        })
        .catch(err => console.error(err));
});

module.exports = router;