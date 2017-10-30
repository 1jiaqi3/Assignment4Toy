/**
 * Created by mac on 29/10/2017.
 */
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  salt: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, user.salt, function (hashErr, hash) {
      if (hashErr) {
        return next(hashErr);
      }
      user.password = hash;
      next();
    });
  }
});

module.exports = {
  User: mongoose.model('User', userSchema),
};
