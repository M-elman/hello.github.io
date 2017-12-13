var mongoose = require('mongoose');

var RelativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
  },
  patientTaxCode: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientSurname: {
    type: String,
    required: true,
  }
});


var Relative = mongoose.model('Relative', RelativeSchema);
module.exports = Relative;

