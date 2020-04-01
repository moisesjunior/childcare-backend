const LocalStrategy = require('passport-local').Strategy,
    Auth = require('../models/auth'),
    bcrypt = require('bcrypt'),
    passport = require('passport'),
    passportJWT = require('passport-jwt'),
    ExtractJWT = passportJWT.ExtractJwt,
    JWTStrategy = passportJWT.Strategy


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.usr_email); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(usr_email, done) {
    Auth.buscaEmail(usr_email, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'usr_email',
    passwordField: 'usr_password'
    }, function(usr_email, usr_password, done) {
        Auth.buscaEmail(usr_email)
                    .then( user => {
                        if (!user) {
                            return done(null, false, {
                                mensagem: 'Login inválido! Verifique as suas credenciais.'
                            });
                        }
                        if (!bcrypt.compareSync(usr_password, user.usr_password)) {
                            return done(null, false, {
                                mensagem: 'Senha incorreta! Verifique as suas credenciais.'
                            });
                        }
                        return done(null, user);
                    });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'childcare-token'
    },
    function (jwtPayload, done) {
        return done(null, user);
    }
));