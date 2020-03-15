const LocalStrategy = require('passport-local').Strategy,
    Usuario = require('../models/usuarios'),
    bcrypt = require('bcrypt'),
    passport = require('passport')

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.usr_email); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(usr_email, done) {
    User.buscaEmail(usr_email, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'usr_email',
    passwordField: 'usr_password'
    }, function(usr_email, usr_password, done) {
        Usuario.buscaEmail(usr_email)
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