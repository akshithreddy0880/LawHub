const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        const DBString = process.env.CONNECTION_STRING;
        const options = {
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            auto_reconnect: true
        }
        mongoose.connect(DBString, options).catch(err => console.error(err));
        
        mongoose.connection.on('connected', () => {
            console.log('connected to MongoDB');
        });

        mongoose.connection.on('connecting', () => {
            console.log('trying to connect MongoDB');
        });

        mongoose.connection.on('error', () => {
            console.log('error occurred during connecting to MongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('disconnected', () => {
            console.log('you are disconnected from MongoDB');
        });

        mongoose.connection.once('open', () => {
            console.log('connection opened to MongoDB');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('reconnected to MongoDB');
        });
    },

    disconnect: () => {
        mongoose.disconnect();
    }
}