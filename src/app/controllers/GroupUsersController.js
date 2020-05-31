const grupoUsuario = require('../models/group_users')

class UserController {
    listaUsuariosPorTipo() {
        return async (req, res) => {
            try{
                let success = await grupoUsuario.listaGrupo(req.params.id)
                res.status(200).send(success)
            } catch (erro){
                res.status(403).send(erro)
            }
            
        }
    }
}

module.exports = new UserController