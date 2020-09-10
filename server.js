const express=require('express');
const app=express();
const connectdb = require('./config/connectdb');
app.use(express.json());
app.use('/', require('./Routes/person'))

const port = process.env.PORT || 4000;
app.listen(port,(err)=>{
    if(err) {console.log('server not run')}
    else { console.log( `server run on port ${port}`);}
    })

    connectdb();