const passport = require('passport');
const local = require('./localStrategy');

const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('passport session save : ', user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};