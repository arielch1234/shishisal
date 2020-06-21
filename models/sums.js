const mongoose = require('mongoose');

const SumSchema = new mongoose.Schema({
  author: {
    type: 'string',
    required: true
  },
  text: {
    type: 'string',
    required: true
  },
  writen: {
    type: 'string',
    default: Date.now
  },

  img: {
    type: 'Boolean',
    default: false
  }

});

const Sum = mongoose.model('Sums', SumSchema);
module.exports = Sum;
