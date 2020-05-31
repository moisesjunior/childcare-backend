const Usuario = require('../models/users')

class UserController {
    listarUsuariosPorTipo() {
        return async (req, res) => {
            try {
                let success = await Usuario.lista(req.params.age_type)
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    adicionarUsuario() {
        return async (req, res) => {
            try{
                let success = await Usuario.adiciona(req.body)
                res.status(200).send(success)
            } catch(error){
                res.status(403).send(error)
            }
        };
    }

    editarUsuario() {
        return async (req, res) => {
            try {
                let success = await Usuario.edita(req.body)
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    buscarUsuario() {
        return async (req, res) => {
            try {
                let success = await Usuario.visualiza(req.params.id)
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    removerUsuario() {
        return async (req, res) => {
            try {
                let success = await Usuario.remove(req.params.id)
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

}
module.exports = new UserController