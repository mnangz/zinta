var Staff       = require('../models/staff');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;
var config      = require('../config/config');
 
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}
 
module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
    Staff.findById(jwt_payload.id, function (err, staff) {
        if (err) {
            return done(err, false);
        }
        if (staff) {
            return done(null, staff);
        } else {
            return done(null, false);
        }
    });
});