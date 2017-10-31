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

let bookSchema = new Schema({
  name: String,
  edition: String,
  remarks: [],
  listing_status: String,
  on_list: Boolean,
  listed_by: {type: Schema.Types.ObjectId, ref: 'User'},
  lento: {type: Schema.Types.ObjectId, ref: 'User'}

});

let requestSchema = new Schema({
  from: {type: Schema.Types.ObjectId, ref: 'User'},
  to: {type: Schema.Types.ObjectId, ref: 'User'},
  status: Number
});

let request_inboxSchema = new Schema ({
  belongs_to: {type: Schema.Types.ObjectId, ref: 'User'},
  requests: [{type: Schema.Types.ObjectId, ref: 'Request'}]
});

let book_listingSchema = new Schema ({
  belongs_to: {type: Schema.Types.ObjectId, ref: 'User'},
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}]
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
