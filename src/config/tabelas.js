class Tabelas {
    init(conexao){
        this.conexao = conexao

        this.criarUsuarios()
        this.criarAgenda()
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

    criarAgenda(){
        const sql = `CREATE TABLE IF NOT EXISTS agenda (
                    age_id INT NOT NULL,
                    age_status INT NOT NULL COMMENT 'Status do agendamento',
                    age_type INT NOT NULL COMMENT 'Tipo do agendamento',
                    age_date DATE NOT NULL COMMENT 'Data do agendamento',
                    age_start TIME NOT NULL COMMENT 'Horário de início do agendamento',
                    age_end TIME NOT NULL COMMENT 'Horário de término do agendamento',
                    age_patient INT NOT NULL COMMENT 'Id do paciente',
                    age_description LONGTEXT NULL COMMENT 'Comentários gerais sobre o agendamento',
                    age_dh_insert DATETIME NOT NULL COMMENT 'Data de inserção do registro',
                    age_dh_changed DATETIME NULL COMMENT 'Data de alteração do registro',
                    PRIMARY KEY (age_id),
                    INDEX fk_age_patient_idx (age_patient ASC) VISIBLE,
                    CONSTRAINT fk_age_patient
                        FOREIGN KEY (age_patient)
                        REFERENCES childcare.usuarios(usr_id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION)
                    COMMENT = 'Agenda do ChildCare'`
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log('Tabela não foi criada  ')
            } else {
                console.log('Tabela criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas