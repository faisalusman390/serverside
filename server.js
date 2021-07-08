const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const app = express();


// connect to db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB CONNECTION ERROR: ', err));

   

// import routes
const authRoutes = require('./routes/auth');

/**
 * setting up the cors policy
 */

 app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// app middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = 'development')) {
    app.use(cors({ origin: `http://localhost:3000` }));
} else {
    app.use(cors({ origin: `https://morning-woodland-52410.herokuapp.com` }));
}



// middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});