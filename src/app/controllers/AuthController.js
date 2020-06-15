const passport = require('passport')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const Usuario = require('../models/users')

class AuthController {
    signup() {
        return async (req, res) => {
            try {
                let success = await Usuario.adiciona(req.body)
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        };
    }


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