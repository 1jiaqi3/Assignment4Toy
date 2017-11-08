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
  title: {type: String, required: true},
  author: {type: String, required: true},
  remarks: {type: Array},
  status: {type: String, required: true},
  on_list: {type: Boolean, required: true},
  listed_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  lento: {type: Schema.Types.ObjectId, ref: 'User'}

});

let requestSchema = new Schema({
  from: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  to: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  status: {type: String, required: true},
  bid: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
});
//
// let request_inboxSchema = new Schema ({
//   belongs_to: {type: Schema.Types.ObjectId, ref: 'User', required:true},
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
