'use strict'

let express = require('express');
let ProviderController = require('../controllers/ProviderController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/providers'});

// Rutas para el controlador de usuarios
api.post('/provider', ProviderController.create);
api.put('/provider/update/:id', md_auth.ensureAuth, ProviderController.update);
api.post('/provider/upload-imagen/:id', [md_auth.ensureAuth, md_upload], ProviderController.uploadImagen);
api.get('/provider/get-imagen/:imageFile', ProviderController.getImagen);
api.get('/providers/:page?', md_auth.ensureAuth, ProviderController.findByAll);
api.get('/provider/:id', md_auth.ensureAuth, ProviderController.findById);
api.delete('/provider/:id', md_auth.ensureAuth, ProviderController.destroy);

module.exports = api;