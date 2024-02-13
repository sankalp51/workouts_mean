const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectdb = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();
const PORT = process.env.PORT;
app.use(cors(require('./config/corsConfig')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//database connection
connectdb();

//debugging middleware
app.use(require('./middleware/logs'));

//workout routes
app.use('/api/workouts', workoutRoutes);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
    })
});