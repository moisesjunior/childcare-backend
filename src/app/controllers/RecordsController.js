const Prontuario = require('../models/records')

class RecordsController {
    listarProntuario = () => {
        return async (req, res) => {
            try {
                let response = ""
                if(req.userType == '2'){
                    response = await Prontuario.listarPorDoc(req.userId)
                } else {
                    response = await Prontuario.listar()
                }
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    listarProntuarioPorPaciente = () => {
        return async (req, res) => {
            try {
                let response = await Prontuario.listarPorPaciente(req.params.id)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

}

module.exports = new RecordsController