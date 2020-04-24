const Usuario = require('../models/users')

class UserController {
    listaUsuarios() {
    }

    adicionaUsuario() {
        return (req, res) => {
            Usuario.teste(req.body)
                .then(usuario => Usuario.adiciona(usuario)
                                    .then(success => res.status(200).send(success))
                                    .catch(erro => res.status(403).send(erro)))
                .catch(erro => res.status(404).send(erro))            
                
        };
    }

    editaUsuario() {
    }

    buscaUsuario() {
    }

    deletaUsuario() {
    }

}
module.exports = new UserController