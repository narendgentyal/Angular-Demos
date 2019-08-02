const User = require('../models/user.model');
const config = require('../config/database');

module.exports = function (passport) {
    var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts = {}
    opts.jwtFromRequest =
        ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUsersById(jwt_payload._id, (err, user) => {
            if (err) return done(err, false);
            if (user) return done(null, user);
            else return done(null, false);
        })
    }))
}