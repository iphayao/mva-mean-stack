var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
// temporary data store
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

module.exports = function(passport) {
    
    // passport need to be able to serialize and deserialize users to support persistant login sessions
    passport.serializeUser(function(user, done) {
        console.log('username: ', user.username);
        console.log('serialize user:', user._id);
        // return the unique id for the user
        done(null, user._id);
    });

    // deserialize use will call with the unique id provide by serialize
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserialize user:', id);
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
 
            User.findOne({'username': username}, function(err, user) {
                if(err) {
                    return done(err);
                }
                // if no user with username
                if(!user) {
                    console.log('user not found with username ' + username);
                    return done(null, false);
                }

                if(!isValidPassword(user, password)) {
                    console.log('incorrect password');
                    return done(null, false);
                }

                return done(null, user);
            });
            //return done(null, false);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allow us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            User.findOne({'username': username}, function(err, user) {
                if(err) {
                    console.log('error in signup ' + err);
                    return done(err);
                }

                if(user) {
                    // we have already signed this user up
                    console.log('user already exist with username: ' + username);
                    return done(null, false);
                }
                else {
                    var user = new User();
                    user.username = username;
                    user.password = createHash(password);
                    
                    user.save(function(err, user) {
                        if(err) {
                            //return done(err, false);
                            console.log('error in saving user ' + err);
                            throw err;
                        }
                        console.log('successfully signed up user ' + username);
                        return done(null, user);
                    });
                }
            });

            
            //return done('we have not implemented this', false);
        }
    ));

    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    // generate hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
    
}
