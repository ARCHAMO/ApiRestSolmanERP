'use strict'

var express = require('express');
var ProviderController = require('../controllers/ProviderController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/providers'});

// Rutas para el controlador de usuarios
api.post('/provider', ProviderController.create);
api.put('/provider/update/:id', md_auth.ensureAuth, ProviderController.update);
api.post('/provider/upload-imagen/:id', [md_auth.ensureAuth, md_upload], ProviderController.uploadImagen);
api.get('/provider/get-imagen/:imageFile', ProviderController.getImagen);
api.get('/providers/:page?', md_auth.ensureAuth, ProviderController.findByAll);
api.get('/provider/:id', md_auth.ensureAuth, ProviderController.findById);
api.delete('/provider/:id', md_auth.ensureAuth, ProviderController.destroy);

module.exports = api;