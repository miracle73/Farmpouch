const path = require('path')
require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express();
const session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));
app.use(express.json())
require('./middleware/auth')
const sequelize = require('./db/connect')
const router = require('./routes/main')
const secondRouter = require('./routes/users')
const thirdRouter = require('./routes/payment')
const fourthRouter = require('./routes/user')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/api/v1/users/error',
        successRedirect: '/api/v1/users/success'
    })
);
app.use('/api/v1/users', secondRouter)
app.use('/api/v1/farms',router)
app.use('/api/v1/payments', thirdRouter)
app.use('/api/v1/user', fourthRouter)
app.post('/api/v1/farms/get',(req,res) => {
    console.log(req.body)
    res.json({here: 'got it'})
})

app.get('/', (req, res) => {
    res.send('<h1> Home Page</h1><br><a href="www.google.com">Google</a>')
})



app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000
const start = async () => {
    try {
        await sequelize
        app.listen(port, () => {
            console.log("Server is listening on port 5000")
        })
    } catch (error) {
        console.log(error)
    }
}
start()
