const Evento = require('../models/events')

class EventController {
    listarEventos = () => {
        return async (req, res) => {
            try{
                let success = await Evento.listar()
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    adicionaEvento = () => {
        return async (req, res) => {
            try {
                let verify = await Evento.verificaAgenda(req.body, null)
                let success = await Evento.adiciona(req.body)
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    visualizaEventoPaciente = () => {
        return async (req, res) => {
            try {
                let success = await Evento.visualizaEventoPaciente(req.params.id)
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    visualizaEvento = () => {
        return async (req, res) => {
            try{
                console.log(req.params.id)
                let success = await Evento.visualizar(req.params.id)
                res.status(200).send(success)
            } catch (error){
                res.status(403).send(error)
            }
        }
    }

    removeEvento = () => {
        return async (req, res) => {
            try {
                let success = await Evento.excluir(req.params.id)
                res.status(200).send(success)
            } catch(error){
                res.status(403).send(error)
            }
        }
    }  

    editaEvento = () => {
        return async (req, res) => {
            try{
                let verify = await Evento.verificaAgenda(req.body, req.params.id)
                let success = await Evento.editar(req.params.id, req.body)
                res.status(200).send(success)
            } catch(error) {
                res.status(403).send(error)
            }
        }
    }

    carregaGraficos = () => {
        return async (req, res) => {
            try {
                let success = await Evento.carregaGraficos()
                res.status(200).send(success)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }
}

module.exports = new EventController