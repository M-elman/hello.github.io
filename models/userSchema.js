var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  isDoctor: {
    type: Boolean,
    required: true
  },
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
  },  
  birthdate: {
    type: Date,
    required: true,
  },
  birthTown: {
    type: String,
    required: true,
  },
  birthProvince: {
    type: String,
    required: true,
    uppercase: true
  },
  gender: {
    type: String,
    required: true,
  },
  taxCode: {
    type: String,
    sparse: true //alternative to "unique: true" requirement, which allows to check the uniqueness only of the elements which have this field
  },
  medicalRegisterProvince: {
    type: String,
    sparse: true
  },
  medicalRegisterNumber: {
    type: String,
    sparse: true
  },
  medicalSpecialties: {
    type: [String],
    sparse: true,
    default: undefined //to overwrite the array default value that is [] (empty array)
  },
  conditions: {
    type: [String],
    sparse: true,
    default: undefined //to overwrite the array default value that is [] (empty array)
  },

    
});

//authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 15, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;

