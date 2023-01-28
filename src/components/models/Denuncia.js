const mongoose = require('../bd/connection')

const schema = mongoose.Schema

const DenunciaSchema = new schema({
    denunciante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sobreviventes',
        require: true 
    },
    denunciado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sobreviventes',
        require: true
    }
})

mongoose.model('Denuncia', DenunciaSchema)

const denuncia = mongoose.model('Denuncia')