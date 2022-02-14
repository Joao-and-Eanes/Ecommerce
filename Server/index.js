const express = require('express')
const app = express()

//config
require('dotenv').config()

const ApiManeger = require('./maneger/api'),
    RouterManeger = require('./maneger/router')
    
ApiManeger.initialize( app )
RouterManeger.initialize( app )

//server
const PORT = process.env.PORT || 8081

app.listen( PORT, () => console.log('Server started!' ) )