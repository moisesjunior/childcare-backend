// Única função do arquivo index.js é subir o servidor
const customExpress = require('./config/custom-express')
const conexao = require('./infra/connection')
const Tabelas = require('./infra/tabelas')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    }
    const app = customExpress()
    
    Tabelas.init(conexao)
    app.listen(3333, () => console.log('Servidor rodando na porta 3333'))
})
