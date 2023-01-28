const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Item = require('../models/Item')

//utilizando model de forma externa
require("../models/sobreviventes")
const Sobrevivente = mongoose.model("sobreviventes")

//rotas
router.post('/cadastrarsobrevivente', async (req, res)=>{
    await Sobrevivente.create(req.body).then(async (sobrevivente)=>{

        res.status(201).send({
            mensagem:"Sobrevivente cadastrado com sucesso: "
        })
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })
})

router.get('/listar',(req,res)=>{
    Sobrevivente.find({infectado: false}).then((sobreviventes)=>{
        return res.status(200).send({sobreviventes})
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })
})

router.put('/alterarlocal',(req,res)=>{
    Sobrevivente.findOne({'_id': req.body.id}).then(async (re)=>{
        var ret = await re.get("infectado")
        if(!ret){
            Sobrevivente.update({_id: req.body.id},{
                $set:{
                    latitude: req.body.latitude, 
                    longitude: req.body.longitude
                }
            }).then(()=>{
                res.status(200).send({mensagem: "Alteração feita com sucesso"})
            }).catch((err)=>{
                var er = "Dados incompariveis: "
                return res.status(400).send({erro: (req.body.erro||er)+err })
            })
        }else{
            var er = "Dados incompariveis: "
            return res.status(400).send({erro: (req.body.erro||er) })
        }
    })
})

router.get('/percentualinfectados', async(req,res)=>{

    try{
        var total = await Sobrevivente.countDocuments()
        var infectados = await Sobrevivente.countDocuments({infectado:true})

        var percentual = (infectados/total*100).toFixed(2)

        return res.status(200).send({percentual})

    }catch(err){
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    }
})

router.get('/percentualnaoinfectados', async(req,res)=>{

    try{
        var total = await Sobrevivente.countDocuments()
        var naoinfectados = await Sobrevivente.countDocuments({infectado:false})

        var percentual = (naoinfectados/total*100).toFixed(2)

        return res.status(200).send({percentual})

    }catch(err){
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    }
})

module.exports = router