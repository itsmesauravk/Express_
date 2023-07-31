
const express = require('express')
const app = express();
const bookMethode = require('./bookMethod')

//middlewares
//to parse the data 
app.use(express.json())
//for using '/' instead of '/api/books'
app.use('/api/books',bookMethode)



app.listen(5000,()=>{
    console.log("Port is listning to 5000" )
})


