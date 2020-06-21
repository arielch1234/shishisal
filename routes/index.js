const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Player = require('../models/Player')
const Sum = require('../models/sums')

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/home', ensureAuthenticated, (req, res) =>
  res.render('home'));

router.get('/players', ensureAuthenticated, (req, res) =>{
  Player.find({}, function(err, player){
    console.log(player.length);
    res.render('players',{data: player});
  })
});

router.get('/summeries', ensureAuthenticated, (req, res) =>{
  Sum.find({}, function(err, sum){
    console.log(sum[0]);
    res.render('summeries',{data: sum});
  })
});


module.exports = router;
