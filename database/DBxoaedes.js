const Sequelize = require('sequelize')
const pg = require('pg')
/*
const dotenv = require('dotenv')
dotenv()
*/


/*
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})
*/
require('dotenv').config()
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:'postgres',
    timezone:'-03:00'
})




//TABELA CIDADAO
const Cidadao = connection.define('checklistdengue',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    nome:{type:Sequelize.STRING, allowNull:false},
    cpf_cidadao:{type:Sequelize.STRING, allowNull:false},
    cpf_profissional:{type:Sequelize.STRING, allowNull:true},
    cnes:{type:Sequelize.STRING, allowNull:true},
    data:{type:Sequelize.STRING, allowNull:false},
    latitude:{type:Sequelize.STRING, allowNull:false},
    longitude:{type:Sequelize.STRING, allowNull:false},
    item01:{type:Sequelize.BOOLEAN, allowNull:false},
    item02:{type:Sequelize.BOOLEAN, allowNull:false},
    item03:{type:Sequelize.BOOLEAN, allowNull:false},
    item04:{type:Sequelize.BOOLEAN, allowNull:false},
    item05:{type:Sequelize.BOOLEAN, allowNull:false},
    item06:{type:Sequelize.BOOLEAN, allowNull:false},
    item07:{type:Sequelize.BOOLEAN, allowNull:false},
    item08:{type:Sequelize.BOOLEAN, allowNull:false},
    item09:{type:Sequelize.BOOLEAN, allowNull:false},
    item10:{type:Sequelize.BOOLEAN, allowNull:false},
    item11:{type:Sequelize.BOOLEAN, allowNull:false},
})

Cidadao.sync({force:true})





//TABELA ESCOLA
const Escola = connection.define('checklistescolas',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    escola:{type:Sequelize.STRING, allowNull:false},
    inep:{type:Sequelize.STRING, allowNull:false},
    professor:{type:Sequelize.STRING, allowNull:false},
    data:{type:Sequelize.STRING, allowNull:false},
    latitude:{type:Sequelize.STRING, allowNull:false},
    longitude:{type:Sequelize.STRING, allowNull:false},
    item01:{type:Sequelize.BOOLEAN, allowNull:false},
    item02:{type:Sequelize.BOOLEAN, allowNull:false},
    item03:{type:Sequelize.BOOLEAN, allowNull:false},
    item04:{type:Sequelize.BOOLEAN, allowNull:false},
    item05:{type:Sequelize.BOOLEAN, allowNull:false},
    item06:{type:Sequelize.BOOLEAN, allowNull:false},
    item07:{type:Sequelize.BOOLEAN, allowNull:false},
    item08:{type:Sequelize.BOOLEAN, allowNull:false},
    item09:{type:Sequelize.BOOLEAN, allowNull:false},
    item10:{type:Sequelize.BOOLEAN, allowNull:false},
    item11:{type:Sequelize.BOOLEAN, allowNull:false},
})

Escola.sync({force:true})





//TABELA ALERTAS
const Alerta = connection.define('alertaarbovirose',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    cpf:{type:Sequelize.STRING, allowNull:false},
    profissional:{type:Sequelize.STRING, allowNull:false},
    ine:{type:Sequelize.STRING, allowNull:false},
    data:{type:Sequelize.STRING, allowNull:false},
    latitude:{type:Sequelize.STRING, allowNull:false},
    longitude:{type:Sequelize.STRING, allowNull:false},
})

Alerta.sync({force:true})






//EXPORTANDO A CONEXÃOE AS TABELAS
module.exports = {connection, Cidadao, Escola, Alerta}