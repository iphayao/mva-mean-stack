var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
// temporary data store
var users = {};

module.exports = function(passport) {
    
    // passport need to be able to serialize and deserialize users to support persistant login sessions
    passport.serializeUser(function(user, done) {
        console.log('serialize user:', user.username);
        // return the unique id for the user
        done(null, user.username);
    });

    // deserialize use will call with the unique id provide by serialize
    passport.deserializeUser(function(username, done) {
        return done(null, users[username]);
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
            console.log(users);
            if(users[username]) {
                console.log('User Not Found with username: ' + username);
                return done(null, false);
            }

            if(isValidPassword(users[username], password)) {
                return done(null, users[username]);
            }
            else {
                console.log('Invalid password ' + username);
                return done(null, false);
            }
            // return done('we have not implemented this', false);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allow us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            if(users[username]) {
                console.log('User already exits with username: ', username);
                return done(null, false);
            }
            
            users[username] = {
                username: username,
                password: createHash(password)
            }

            console.log(users[username].username + ' Registration successful');
            return done(null, users[username]);
            //return done('we have not implemented this', false);
        }
    ));

    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.passport);
    };
    // generate hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
    
}
