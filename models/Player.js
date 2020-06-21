const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({

  name: {
    type: 'string',
    required: true
  },
  shooting: {
    type: 'Number',
    required: true
  },
  passing: {
    type: 'Number',
    required: true
  },
  rebounding: {
    type: 'Number',
    required: true
  },
  stealing: {
    type: 'Number',
    required: true
  },
  trashing: {
    type: 'Number',
    required: true
  },
  main_text: {
    type: 'string',
    required: true
  }
});

const Player = mongoose.model('players', PlayerSchema);
module.exports = Player;
