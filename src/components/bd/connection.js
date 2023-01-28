const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/trz").then( () => {
    console.log("Mongodb Conectado...")
}).catch( (err) => {
    console.log("Erro ao se conectar com o mongodb: \n "+err)
})

module.exports = mongoose