class Tabelas {
    init(conexao){
        console.log('Alou')
        this.conexao = conexao

        this.criarUsuarios()
    }

    criarUsuarios(){
        const sql = `CREATE TABLE IF NOT EXISTS usuarios (usr_id int NOT NULL AUTO_INCREMENT,
            usr_email varchar(50) NOT NULL,
            usr_password varchar(255) NOT NULL,
            usr_name varchar(255) NOT NULL,
            usr_data_insercao DATETIME NOT NULL,
            PRIMARY KEY(usr_id))
        `
        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log('Tabela não foi criada  ')
            } else {
                console.log('Tabela criada com sucesso')    
            }
        })
    }
}

module.exports = new Tabelas