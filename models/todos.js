var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  body:   String,
  user:   String,
  date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('todos', todoSchema);
