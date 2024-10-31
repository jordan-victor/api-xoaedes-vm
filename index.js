//CONFIGURAÇÕES INICIAIS
const express = require('express')
const app = express()
const BodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json())

const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 3000


//FileUpLoad
const fileupload = require('express-fileupload')
app.use(fileupload())




//CONFIGURANDO O BANCO
const db = require('./database/DBxoaedes')
const { where } = require('sequelize')

const connection = db.connection
connection.authenticate()
.then(()=>{
    console.log('Conexão realizada')
})
.catch((erro)=>{
    console.log(erro)
})

//IMPORTANDO TABELAS/MODELS
const Cidadao = db.Cidadao
const Escola = db.Escola
const Alerta = db.Alerta











//DASHBOARD DE VISUALIZAÇÃO DE TABELAS
app.get('/', async(req, res)=>{
    Cidadao.findAll({order:[['id', 'DESC']]})
    .then(checklists=>{
      res.render('dashboard',{
        checklists:checklists
      })  
    })
    .catch(error=>{
        res.send(error)
    }) 
})

app.get('/dashescola', async(req, res)=>{
    Escola.findAll({order:[['id', 'DESC']]})
    .then(checklists=>{
      res.render('escola',{
        checklists:checklists
      })  
    })
    .catch(error=>{
        res.send(error)
    })
})

app.get('/dashalerta', async(req, res)=>{
    Alerta.findAll({order:[['id', 'DESC']]})
    .then(checklists=>{
      res.render('alerta',{
        checklists:checklists
      })  
    })
    .catch(error=>{
        res.send(error)
    })
})










//-------------------------- 1. CRUD COM A TABELA DE ALERTA ARBOVIROSES ------------------------
//1.1 CRIANDO REGISTROS NO DB
app.post('/alertaarboviroses', async(req, res)=>{
    let cpf = req.body.cpf
    let profissional = req.body.profissional
    let ine = req.body.ine
    let data = req.body.data
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    
    Alerta.create({
        cpf: cpf,
        profissional: profissional,
        ine: ine,
        data: data,
        latitude: latitude,
        longitude: longitude
    }).then(()=>{
        res.status(200).json({message:200})
        console.log("Registro Criado")
    }).catch(error=>{
        res.status(400).json({message:400})
    })
})



//1.2 LENDO TODOS OS REGISTROS NO DB
app.get('/alertaarboviroses', (req, res)=>{
    Alerta.findAll({raw:true, order:[['id', 'DESC']]}).then(resposta=>{
        res.json(resposta)
    }).catch((error)=>{
        res.send(error)
    })
})


app.get('/alertaarboviroses/delete', (req, res)=>{
    Alerta.destroy({where:{profissional:"Profissional"}}).then(resposta=>{
        res.send("Registros deletados")
    })
})










//-------------------------- 2. CRUD COM A TABELA CIDADÃO ------------------------
//2.1 CRIANDO REGISTROS NO DB
app.post('/checklistdengue', async (req, res)=>{
    let nome = req.body.nome
    let cpf_cidadao = req.body.cpf_cidadao
    let cpf_profissional = req.body.cpf_profissional
    let cnes = req.body.cnes
    let data = req.body.data
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    let item01 = req.body.item01
    let item02 = req.body.item02
    let item03 = req.body.item03
    let item04 = req.body.item04
    let item05 = req.body.item05
    let item06 = req.body.item06
    let item07 = req.body.item07
    let item08 = req.body.item08
    let item09 = req.body.item09
    let item10 = req.body.item10
    let item11 = req.body.item11
    
    Cidadao.create({
        nome: nome,
        cpf_cidadao: cpf_cidadao,
        cpf_profissional: cpf_profissional,
        cnes:cnes,
        data: data,
        latitude: latitude,
        longitude: longitude,
        item01: item01,
        item02: item02,
        item03: item03,
        item04: item04,
        item05: item05,
        item06: item06,
        item07: item07,
        item08: item08,
        item09: item09,
        item10: item10,
        item11: item11
    }).then(resposta=>{
        res.status(200).json({message:200})
        console.log(`Operação realizada com sucesso: ${resposta}`)
    })
    .catch(error=>{
        res.status(400).json({message:400})
        console.log(`Error: ${error}`)
    })
})

//LIMPAR REGISTROS DO CIDADÃO
app.get('/checklistdengue/delete/:cpf?', (req, res)=>{
    let cpf = req.params.cpf
    Cidadao.destroy({where:{cpf_cidadao:cpf}}).then(resposta=>{
        res.send("Registros deletados")
    })
})


//2.2 LENDO TODOS OS REGISTROS NO DB QUE POSSUEM O CPF ESPECIFICADO NA URL
app.get('/checklistdengue/:cpf?', async (req, res)=>{
    let cpf = req.params.cpf

    Cidadao.findAll({raw:true, where:{cpf_cidadao:cpf}, limit:10, order:[['id', 'DESC']]})
    .then(resposta=>{
        res.json(resposta)
    })
    .catch(error=>{
        res.send(error)
    })
})






//----------------------------- 3. CRUD COM A TABELA ESCOLA --------------------------------
//3.1 CRIANDO REGISTROS NO DB
app.post('/checklistescolas', async(req, res)=>{
    let professor = req.body.professor
    let escola = req.body.escola
    let inep = req.body.inep
    let data = req.body.data
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    let item01 = req.body.item01
    let item02 = req.body.item02
    let item03 = req.body.item03
    let item04 = req.body.item04
    let item05 = req.body.item05
    let item06 = req.body.item06
    let item07 = req.body.item07
    let item08 = req.body.item08
    let item09 = req.body.item09
    let item10 = req.body.item10
    let item11 = req.body.item11

    Escola.create({
        professor: professor,
        escola: escola,
        inep: inep,
        data: data,
        latitude: latitude,
        longitude: longitude,
        item01: item01,
        item02: item02,
        item03: item03,
        item04: item04,
        item05: item05,
        item06: item06,
        item07: item07,
        item08: item08,
        item09: item09,
        item10: item10,
        item11: item11
    })
    .then(resposta=>{
        res.status(200).json({message:200})
        console.log(`Operação realizada com sucesso: ${resposta}`)
    })
    .catch(error=>{
        res.status(400).json({message:400})
        console.log(`Error: ${error}`)
    })
})


//LENDO TODOS OS REGISTROS NO DB QUE POSSUEM O INEP ESPECIFICADO
app.get('/checklistescolas/:inep?', async(req, res)=>{
    let inep = req.params.inep

    Escola.findAll({raw:true, where:{inep: inep}, limit:10, order:[['id', 'DESC']]})
    .then(resposta=>{
        res.json(resposta)
    })
    .catch(error=>{
        console.send(error)
    })
})







/*
//CRUD COM ARQUIVOS DE IMAGEM
app.post('/img', async(req, res)=>{
    let img = req.files.img.name
    req.files.img.mv(__dirname + '/imgs/' + req.files.imagem.name)
})
*/




app.listen(port,()=>{
    console.log('API running')
})