const mongoose = require("../bd/connection")


//Define a schema
var Schema = mongoose.Schema;

//criando models 
const sobreviventeSchima = new Schema({
    nome: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true, 
        min: [0, 'Muito jovem.']
    },
    genero:{
        type: String,
        require: true,
        enum: ['M', 'F', 'NB']
        //masculino, feminino e não binário
    },
    latitude:{
        type: Number,
        require: true,
        min: [-90, "Erro de latitude"],
        max: [90, "Erro de latitude"]
    },
    longitude:{
        type: Number,
        require: true,
        min: [-180,"Erro de longitude"],
        max: [180, "Erro de longitude"]
    },
    infectado:{
        type: Boolean,
        require: true,
        default: false
    }
})

//collection
mongoose.model('sobreviventes', sobreviventeSchima)

//criando usuario
const sobrevivente = mongoose.model('sobreviventes')