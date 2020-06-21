const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const passport = require('passport');
router.get('/login', (req,res) => res.render('login'));

router.get('/register', (req,res) => res.render('register'));

//handle register
router.post('/register', (req,res)=>{
  const {name, email, password, password2} = req.body;
  let Errors = [];
  if(!name || !email || !password ||!password2){
    Errors.push({msg:'fill in fields'});
  }
  if (password !== password2){
    Errors.push({msg: 'passwords not match'});
  }
  if (password.length < 6){
    Errors.push({msg: 'password less then 6 char'})
  }

  if(Errors.length > 0){
    res.render('register', {
      Errors, name, email, password, password2
    })
  }else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        Errors.push({ msg: 'Email already exists' });
        res.render('register', {
          Errors,
          name,
          email,
          password,
          password2
        });
        //hash password
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                      .save()
                      .then(user => {
                        req.flash('seccess_msg', 'you got reg');
                        res.redirect('/users/login');
                      })
                      .catch(err => console.log(err));
                  });
                });
              }
            });
          }
        });

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;
