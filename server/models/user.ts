import mongoose from '../db';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favourites: [String],
  ingredients: [String]
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
