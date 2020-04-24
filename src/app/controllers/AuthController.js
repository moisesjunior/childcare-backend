const passport = require('passport')
const jwt = require('jsonwebtoken')

class AuthController {
    
    login() {
        return function(req, res, next) {
            passport.authenticate('local', (erro, usuario, info) => {
                if(info){
                    return res.status(400).send(info)
                }

                if(erro){
                    return next(erro);
                }

                req.login(usuario, {session: false}, (erro) => {
                    if(erro){
                        return next(erro);
                    }
                    const token = jwt.sign(JSON.stringify(usuario), 'childcare-token');
                    return res.send({usuario, token});
                })
            })(req, res, next); // responsável por executar a estratégia de autenticação
        };
    }
}

module.exports = new AuthController