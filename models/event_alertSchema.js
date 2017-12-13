var mongoose = require('mongoose');

var Event_alertSchema = new mongoose.Schema({
  idDoc: {
    type: String,
    required: true,
  },
  metadata: {
    type: String,
    required: true,
  },
  payload: {
    type: String,
    required: true,
  }
});


var Event = mongoose.model('Event', Event_alertSchema);
module.exports = Event;

