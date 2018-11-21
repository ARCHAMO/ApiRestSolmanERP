'use strict'

let express = require('express');
let ConfigurationController = require('../controllers/ConfigurationController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/customers'});

// Rutas para el controlador de configuracion
api.post('/configuration', ConfigurationController.create);
api.put('/configuration/update/:id', md_auth.ensureAuth, ConfigurationController.update);
api.post('/configuration/upload-imagen/:id', [md_auth.ensureAuth, md_upload], ConfigurationController.uploadImagen);
api.get('/configuration/get-imagen/:imageFile', ConfigurationController.getImagen);
api.get('/configurations/:page?', md_auth.ensureAuth, ConfigurationController.findByAll);
api.get('/configuration/:id', md_auth.ensureAuth, ConfigurationController.findById);
api.delete('/configuration/:id', md_auth.ensureAuth, ConfigurationController.destroy);

module.exports = api;