const Paciente = require('../models/patient')
const Prontuario = require('../models/records')

class PatientController {
    listarPaciente = () => {
        return async(req, res) => {
            try {
                let response = await Paciente.listar()
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    visualizaPaciente = () => {
        return async(req, res) => {
            try {
                let response = await Paciente.visualizar(req.params.id)
                res.status(200).send(response)
            } catch(error) {
                res.status(403).send(error)
            }
        }
    }

    listaPacientePorMedico = () => {
        return async(req, res) => {
            try{
                let response = await Paciente.listarPorDoc(req.params.id)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    adicionaPaciente = () => {
        return async(req, res) => {
            try {
                await Paciente.verifica(req.body)
                let id = await Paciente.adicionar(req.body)
                let response = await Prontuario.adicionar(id) 
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    editaPaciente = () => {
        return async(req, res) => {
            try {  
                await Paciente.verifica(req.body, req.params.id)
                let response = await Paciente.editar(req.body)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    removePaciente = () => {
        return async(req, res) => {
            try {
                let response = await Paciente.remove(req.params.id)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    listarPacienteToSelect = () => {
        return async(req, res) => {
            try{
                let response = await Paciente.listarSelect()
                res.status(200).send(response)
            } catch(error){
                res.status(403).send(error)
            }
        }
    }
}

module.exports = new PatientController