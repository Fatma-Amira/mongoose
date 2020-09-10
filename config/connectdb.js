//importer mongoose
// importer config
const mongoose = require('mongoose')
const config=require('config')

//connecter à la base de données

const connectdb=()=>{
    mongoose.connect(config.get("MONGO_URI"),
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));}

    module.exports=connectdb