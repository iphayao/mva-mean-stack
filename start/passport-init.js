var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
// temporary data store
var user = {};
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log('serialize user:', user.username);
        return done(null, user.username);
    });

    possport.deserializeUser(function(user, done) {
        return done('we have not implemented this', false);
    });

    passport.use('login', new LocalStrategy({
            passReqToCallBack: true
        },
        function(req, username, password, done) {
            return done('we have not implemented this', false);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallBack : true
        },
        function(req, username, password, done) {
            return done('we have not implemented this', false);
        }
    ));

    var isValidPassword = function(user, passport) {
        return bCrypt.compareSync(password, user.passport);
    };
    // generate hash using bCrypt
    var createHash = function(passport) {
        return bCrypt.hashSync(password, bCrypt.getSaltSync(10), null);
    };
    
}
