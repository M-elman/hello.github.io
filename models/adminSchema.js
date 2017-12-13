var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  }
});

//authenticate input against database
AdminSchema.statics.authenticate = function (username, password, callback) {
  Admin.findOne({ username: username })
    .exec(function (err, adm) {
      if (err) {
        return callback(err)
      } else if (!adm) {
        var err = new Error('Admin not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, adm.password, function (err, result) {
        if (result === true) {
          return callback(null, adm);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
AdminSchema.pre('save', function (next) {
  var adm = this;
  bcrypt.hash(adm.password, 15, function (err, hash) {
    if (err) {
      return next(err);
    }
    adm.password = hash;
    next();
  })
});


var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;

