const Medico = require('../models/doctor')

class DoctorController {
    listarMedico = () => {
        return async (req, res) => {
            try {
                let response = await Medico.listar()
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    visualizaMedico = () => {
        return async (req, res) => {
            try {
                let response = await Medico.visualizar(req.params.id)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    adicionaMedico = () => {
        return async (req, res) => {
            try {
                await Medico.verifica(req.body)
                let response = await Medico.adicionar(req.body)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    editaMedico = () => {
        return async (req, res) => {
            try {
                await Medico.verifica(req.body)
                let response = await Medico.editar(req.body, req.params.id)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    removeMedico = () => {
        return async (req, res) => {
            try {
                let response = await Medico.remove(req.params.id)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }
}

module.exports = new DoctorController