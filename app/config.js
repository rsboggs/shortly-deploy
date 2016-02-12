var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');

var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected');
});

exports.urls = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
});

exports.users = new Schema({
  username: String,
  password: String,
  createdAt: {type: Date, default: Date.now}
});


exports.mongoose = mongoose;