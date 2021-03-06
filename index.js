'use strict'

let mongoose = require('mongoose');

let urlDbNube = 'mongodb://desarrollo:Desa820901*!@'+
    'prueba-shard-00-00-rqr9q.mongodb.net:27017,'+
    'prueba-shard-00-01-rqr9q.mongodb.net:27017,'+
    'prueba-shard-00-02-rqr9q.mongodb.net:27017/'+
    'test?ssl=true&'+
    'replicaSet=Prueba-shard-0&'+
    'authSource=admin';

let urlDbLocal = 'mongodb://localhost:27017/desarrollo';
let app = require('./app');
let port = process.env.PORT || 3977;

mongoose.connect(urlDbNube, (err, res) => {
    if(err) {
        throw err;
    } else {
        console.log('La conexion a la base de datos esta corriendo correctamente...');
        app.listen(port, function () {
            console.log('Servidor escuchando en http://localhost:'+port);
        })
    }
});
