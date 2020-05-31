// Única função do arquivo index.js é subir o servidor
const customExpress = require('./src/config/custom-express')
const conexao = require('./src/config/connection')
const Tabelas = require('./src/config/tabelas')
require("dotenv").config()

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    }
    const app = customExpress()
    
    Tabelas.init(conexao)
    let port = ""
    if(process.env.PORT){
        port = process.env.PORT
    } else {
        port = 3333
    }
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`))
})
