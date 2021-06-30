const mongoose = require('mongoose');

const lawyer = new mongoose.Schema(
    {
        'lawyerId': { type: String, required: true },
        'username': { type: String, required: true },
        'email': { type: String, required: true, unique: true },
        'password': { type: String },
        'type': { type: String, required: true },
        'experience': {type: String, required: true},
        'fee': { type: Number, required: true },
        'mobilenumber': { type: String, required: true },
        'isDeleted': { type: Boolean, required: true, default: false },
        'isVerified': { type: Boolean, required: true, default: true },
        'role': { type: String, required: true, enum: ['client', 'lawyer', 'admin'], default: 'lawyer' },
        'caseRecord': [{
            'caseId': { type: String },
        }],
        'appointments': [{
            'bookingId': { type: String, unique: true },
            'clientname': { type: String },
            'email': { type: String, unique: true },
            'date': { type: String },
            'timeslot': { type: String },
            'accepted': { type: Boolean,  default: false }
        }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Lawyers',lawyer);