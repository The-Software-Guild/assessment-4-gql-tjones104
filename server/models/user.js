const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String, index: true, unique: true },
    createdAt: { type: Date },
  },
  { versionKey: false }
);

// encrypt password before save
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, stage.saltingRounds, function (err, hash) {
      if (err) {
        console.log('Error hashing password for user', user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
