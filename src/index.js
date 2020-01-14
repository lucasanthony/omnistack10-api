const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

server.use(cors());

server.use(express.json())
server.use(routes);

mongoose.connect('mongodb://lucasanthony:omnistack40@ds263448.mlab.com:63448/omnistack?authMode=scram-sha1?retryWrites=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

mongoose.connection.on('connected', () => {
    console.log('Conectado com o banco de dados MLab!');
})

mongoose.connection.on('error', (err) => {
    console.log("Erro na conexão com o banco de dados MLab: " + err);
});


const port = process.env.PORT || 4444;
server.listen(port);