const Consulta = require('../models/appointment')

class AppointmentController {
    listarConsulta = () => {
        return async (req, res) => {
            try {
                let response = await Consulta.listar()
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    visualizaConsulta = () => {
        return async (req, res) => {
            try {
                let response = await Consulta.visualizar(req.params.id)
                res.status(200).send(response)
            } catch (error) {
                res.status(403).send(error)
            }
        }
    }

    adicionaConsulta = async (req, res) => {
        let file = {}
        if(req.file !== undefined){
            const { originalname: name, size, key, location: url = "" } = req.file;
            
            file = {
                name: name,
                size: size,
                key: key,
                path: url
            }
        }
        
        try {
            if(req.file !== undefined){
                let id = await Consulta.adicionar(req.body)
                let response = await Consulta.adicionarArquivo(file, id)
                res.status(200).send(response)
            } else {
                let response = await Consulta.adicionar(req.body)
                if(response > 0){
                    response = "Ação concluída com sucesso"
                }
                res.status(200).send(response)
            }
        } catch (error) {
            res.status(403).send(error)
        }
    }

    visualizaExames = async(req, res) => {
        try{
            let response = await Consulta.visualizaExames(req.params.id)
            res.status(200).send(response)
        } catch (error){
            res.status(403).send(error)
        }
    }
}

module.exports = new AppointmentController