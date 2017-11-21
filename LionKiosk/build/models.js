/**
 * Created by mac on 29/10/2017.
 */
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String, unique: true},
  password: {type: String},
  salt: {type: String}
});

let bookSchema = new Schema({
  title: {type: String},
  author: {type: String},
  remarks: {type: Array},
  status: {type: String},
  on_list: {type: Boolean},
  listed_by: {type: Schema.Types.ObjectId, ref: 'User'},
  lento: {type: Schema.Types.ObjectId, ref: 'User'}

});

let requestSchema = new Schema({
  from: {type: Schema.Types.ObjectId, ref: 'User'},
  to: {type: Schema.Types.ObjectId, ref: 'User'},
  status: {type: String, required: true},
  bid: {type: Schema.Types.ObjectId, ref: 'Book'},
});
//
// let request_inboxSchema = new Schema ({
//   belongs_to: {type: Schema.Types.ObjectId, ref: 'User'},
//   requests: [{type: Schema.Types.ObjectId, ref: 'Request'}]
// });
//
// let book_listingSchema = new Schema ({
//   belongs_to: {type: Schema.Types.ObjectId, ref: 'User'},
//   books: [{type: Schema.Types.ObjectId, ref: 'Book'}]
// });


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
  Book: mongoose.model('Book', bookSchema),
  Request: mongoose.model('Request', requestSchema),
  // Request_inbox: mongoose.model('Request_inbox', request_inboxSchema),
  // Book_listing: mongoose.model('Book_listing', book_listingSchema)

};
