//carregando modulos
const express = require('express')
const app = express()
const mongoose = require('./src/components/bd/connection')
const morgan = require('morgan')
const bodyParser = require('body-parser')

//requerindo rotas
const sobrevivente = require('./src/components/routes/sobrevivente')
const item = require('./src/components/routes/item')
const denuncia = require('./src/components/routes/denuncia')


//call back das requisições
app.use(morgan('dev'))
//define o corpo da entrada da requisição
app.use(bodyParser.urlencoded({extended: false}))//dados simples
app.use(bodyParser.json())//apenas entrada de json no body

//rotas
app.use('/sobrevivente', sobrevivente)
app.use('/item',item)
app.use('/denuncia', denuncia)

//casos de erro
app.use((req,res,next)=>{
    const err = new Error("Não encontrado")
    err.status = 404
    next(err)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    return res.send({
        erro:{
            mensagem: err.menssage
        }
    })
})

//iniciando server
const PORT = 8082

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta "+PORT+"...")
})