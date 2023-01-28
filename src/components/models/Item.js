const mongoose = require("../bd/connection")

var schema = mongoose.Schema

const ItemSchima = new schema({
    nome: {
        type: String,
        require: true
    },
    quantidade: {
        type: Number,
        require: true, 
        min: [0, 'Pouco.']
    },
    descricao:{
        type: String,
        require: true,
    },
    idSobrevivente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sobreviventes',
        require: true
    }
})

//criando item
const Item = mongoose.model('Item', ItemSchima)

module.exports = Item