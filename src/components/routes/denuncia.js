const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/Denuncia")
const Denuncia = mongoose.model("Denuncia")

require("../models/sobreviventes")
const Sobrevivente = mongoose.model("sobreviventes")

router.get('/', (req, res)=>{
    res.status(200).send("inicial")
})

router.post('/denunciarsobrevivente', async(req,res)=>{
    Sobrevivente.findOne({'_id': req.body.denunciante}).then(async (re)=>{
        const ret = await re.get("infectado")
        console.log(ret)
        if(!ret){
            if(req.body.denunciante == req.body.denunciado){
                var er = "Dados incompariveis: "
                return res.status(400).send({erro: (req.body.erro||er)+err })
            }

            const denuncia = await Denuncia.create(req.body).then(()=>{

                Denuncia.countDocuments({denunciado: req.body.denunciado}).then((count)=>{

                    if(count <5){
                        return res.status(201).send({
                            mensagem: "Denuncia feita com sucesso. "
                        })
                    }else{
                        Sobrevivente.update({_id : req.body.denunciado}, {$set: {infectado: true}}).then(()=>{
                            return res.status(201).send({
                                mensagem: "Denuncia feita com sucesso. "
                            })
                        })
                    }
                })
            }).catch((err)=>{
                var er = "Dados incompariveis: "
                return res.status(400).send({erro: (req.body.erro||er)+err })
            })
        }else{
            var er = "Dados incompariveis: "
            return res.status(400).send({erro: (req.body.erro||er) })
        }
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })

})

router.get('/listardenuncias',(req,res)=>{
    Denuncia.find().populate(['denunciante', 'denunciado']).then((denuncias)=>{
        return res.status(200).send({denuncias})
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })
})

router.get('/countdenunciado', async (req,res)=>{
   
    Denuncia.countDocuments({denunciado: req.body.denunciado}).then((count)=>{

        return res.status(200).send({
            count
        })
    }).catch((err)=>{
        var er = "Dados incompariveis: "
        return res.status(400).send({erro: (req.body.erro||er)+err })
    })        
})
    

module.exports = router