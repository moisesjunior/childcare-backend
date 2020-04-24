const Evento = require('../models/events')

class EventController {
    listarEventos = () => {
        return (req, res) => {
            Evento.listar()
                .then(success => res.status(200).send(success))
                .catch(erro => res.status(403).send(erro))
        }
    }

    adicionaEvento = () => {
        return (req, res) => {
            Evento.adiciona(req.body)
                .then(success => res.status(200).send(success))
                .catch(erro => res.status(403).send(erro))
        }
    }

    visualizaEvento = () => {
        return (req, res) => {
            Evento.visualizar(req.params.id)
                .then(success => res.status(200).send(success))
                .catch(erro => res.status(403).send(erro))
        }
    }

    removeEvento = () => {
        return (req, res) => {
            Evento.excluir(req.params.id)
                .then(success => res.status(200).send(success))
                .catch(erro => res.status(403).send(erro))
        }
    }  

    editaEvento = () => {
        return (req, res) => {
            Evento.editar(req.params.id, req.body)
                .then(success => res.status(200).send(success))
                .catch(erro => res.status(403).send(erro))
        }
    }
}

module.exports = new EventController