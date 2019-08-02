const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var passport = require('passport');// create a passport instance
var myPassportService = require('./config/passport')(passport);
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/usersRoutes');

const app = express();

mongoose.connect(config.database, { useNewUrlParser: true });

// connecting database
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
})

mongoose.connection.on('error', (err) => {
    console.log('Connection Failed To : ' + config.database);
    console.log(err);
})


const port = 3000;
app.use(cors());
// app.use(express.static(__dirname, 'public'));
app.use(bodyParser.json());
// enabling passport authentication for routes
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

// starting server
app.listen(port, () => {
    console.log('Server started on port : ' + port);
})
