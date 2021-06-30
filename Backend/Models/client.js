const mongoose = require('mongoose');

const user = new mongoose.Schema( 
    {
        'username': { type: String, required: true },
        'email': { type: String, required: true, unique: true },
        'password': { type: String, required: true, },
        'isDeleted': { type: Boolean, required: true, default: false },
        'isVerified': {type: Boolean, required: true, default: false},
        'role': { type: String, required: true, enum: ['client', 'lawyer', 'admin'], default: 'client'}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Clients',user);