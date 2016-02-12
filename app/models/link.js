var db = require('../config');
var crypto = require('crypto');

db.urls.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code =  shasum.digest('hex').slice(0, 5);
  next();
});

var Link = db.mongoose.model('Link', db.urls);

module.exports = Link;
