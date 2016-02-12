var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

db.users.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

db.users.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};


var User = db.mongoose.model('User', db.users);

module.exports = User;
