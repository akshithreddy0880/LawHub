require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const DB = require('./Backend/Database/DBconnection');
const pageRoutes = require('./Backend/Routes/pages');
const clientRoutes = require('./Backend/Routes/clients');
const lawyerRoutes = require('./Backend/Routes/lawyers');
const apiRoutes = require('./Backend/Routes/api');
const {locals} = require('./Backend/Middlewares/locals');
const {notFound,errorMsg} = require('./Backend/Middlewares/error');
const {sessionOptions,corsOptions} = require('./Backend/Utils/variables');

DB.connect();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Frontend', 'views'));
app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session(sessionOptions));
app.use(flash());
app.use(cors(corsOptions));
app.use(locals);
app.use(pageRoutes);
app.use('/users', clientRoutes);
app.use('/lawyers', lawyerRoutes);
app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorMsg);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started running at http://localhost:${port}`);
});