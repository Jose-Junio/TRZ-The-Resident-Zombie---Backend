const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/sobreviventes")
const Sobrevivente = mongoose.model("sobreviventes")

const Item = require("../models/Item")

router.get('/', (req, res)=>{
    res.status(200).send("inicial")
})

router.post('/cadastroitem', async(req,res)=>{

    Sobrevivente.findOne({'_id': req.body.idSobrevivente}).then(async (re)=>{
        var ret = await re.get("infectado")
        if(!ret){
            const item = await Item.create(req.body).then(()=>{
                res.status(201).send({
                    mensagem:"Item cadastrado com sucesso"
                })
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

router.get('/listaritem',(req,res)=>{
    Item.aggregate([{
        $lookup:{
            from: 'sobreviventes',
            localField: 'idSobrevivente',
            foreignField: '_id',
            as: 'agregate',
        }
    },{
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$agregate", 0 ] }, "$$ROOT" ] } }
    },{
        $match: {infectado: false}
    },
    { 
        $project: { 
            agregate: 0, 
            idade:0,
            genero:0,
            latitude:0,
            longitude:0,
            __v:0,
            infectado:0
        }
    }]).then((item)=>{
        return res.status(200).send({ item })
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })
})

router.get('/listatodositens',(req,res)=>{
    Item.find().populate('idSobrevivente').then((item)=>{
        return res.status(200).send({ item })
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })
})

router.get('/procuraritem', async(req,res)=>{
    Item.findById(req.body.id).then((item)=>{
        return res.send({ item })
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })
})

router.put('/alteraritem', async(req,res)=>{
    
    Item.findOne({'_id': req.body.id}).then(async (r)=>{
        var re = await r.get("idSobrevivente")
        Sobrevivente.findOne({'_id': re}).then(async(ret)=>{
            var retu = await ret.get("infectado")
            if(!retu){

                Item.findByIdAndUpdate(req.body.id,{
                    nome: req.body.nome,
                    quantidade: req.body.quantidade,
                    descricao: req.body.descricao
                }).then(async (item)=>{
                    await Item.findById(req.body.id).then((it)=>{
                        return res.status(200).send({ it })
                    })
                    
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
})

router.delete('/deletaritem', async(req,res)=>{
    Item.findOne({'_id': req.body.id}).then(async (r)=>{
        var re = await r.get("idSobrevivente")
        Sobrevivente.findOne({'_id': re}).then(async(ret)=>{
            var retu = await ret.get("infectado")
            if(!retu){

                Item.findByIdAndRemove(req.body.id).then((item)=>{
                    return res.status(200).send({
                        mensagem: "deletado com sucesso"
                    })
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

})

router.get('/listaritemperdidos',(req,res)=>{
    Item.aggregate([{
        $lookup:{
            from: 'sobreviventes',
            localField: 'idSobrevivente',
            foreignField: '_id',
            as: 'agregate',
        }
    },{
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$agregate", 0 ] }, "$$ROOT" ] } }
    },{
        $match: {infectado: true}
    },
    { 
        $project: { 
            agregate: 0, 
            idade:0,
            genero:0,
            latitude:0,
            longitude:0,
            __v:0,
            infectado:0
        }
    }]).then((item)=>{
        return res.status(200).send({ item })
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })
})

router.get('/totalitenssobrevivente',(req,res)=>{
    Item.countDocuments({idSobrevivente: req.body.id}).then((count)=>{
        return res.status(200).send({
            count
        })
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })
})

router.get('/totalitens',(req,res)=>{
    
    Item.aggregate([{
        $lookup:{
            from: 'sobreviventes',
            localField: 'idSobrevivente',
            foreignField: '_id',
            as: 'agregate',
        }
    },{
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$agregate", 0 ] }, "$$ROOT" ] } }
    },{
        $match: {infectado: true}
    },
    { 
        $project: { 
            "agregate._id":0,
            "agregate.idade":0,
            "agregate.genero":0,
            "agregate.latitude":0,
            "agregate.longitude":0,
            "agregate.__v":0,
            "agregate.infectado":0,
            idade:0,
            genero:0,
            latitude:0,
            longitude:0,
            __v:0,
            infectado:0,
            idSobrevivente:0,
            _id:0,
            descricao: 0,
            
        }
    }]).sort({idSobrevivente: 1}).then((result)=>{
        res.status(200).send({result})
    })

})

module.exports = router