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
    app.listen(process.env.PORT || 3333, () => console.log('Servidor rodando!'))
})
