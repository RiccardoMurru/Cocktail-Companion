const mongoose = require('../db')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favourites: [Number],
  ingredients: [String]
})

const User = mongoose.model('User', userSchema);


module.exports = User;

