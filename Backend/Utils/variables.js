const MongoStore = require('connect-mongo');

module.exports = {
    sessionOptions: {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            'secure': false,
            'maxAge': 24*7*60*1000
        },
        store: MongoStore.create({mongoUrl: process.env.CONNECTION_STRING})
    },

    corsOptions: {
        origin: '*',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        optionsSuccessStatus: 200
    }
}