const express = require('express');
const passport = require('passport')
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

require('./config/passport')(passport);
const db = require('./config/keys').MongoURI;
//DB config
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));
//EJS stuff
app.use(expresslayouts);
app.set('view engine', 'ejs');

//bodyparser
app.use(express.urlencoded({extended: false}));

//express session midlware
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// flash

app.use(flash());

// glanal vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//ROUTES
app.use('/public', express.static('public'));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
//server port & listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server run on port ${PORT}`));
