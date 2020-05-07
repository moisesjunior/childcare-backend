const passport = require('passport')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

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

                req.login(usuario, (erro) => {
                    if(erro){
                        return next(erro);
                    }
                    const token = jwt.sign({id: usuario.usr_id, type: usuario.usr_ugr_id}, authConfig.secret, {
                        expiresIn: 86400
                    });
                    res.send({usuario, token});
                })
            })(req, res, next); // responsável por executar a estratégia de autenticação
        };
    }
}

module.exports = new AuthController