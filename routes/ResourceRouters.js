'use strict'

let express = require('express');
let ResourceController = require('../controllers/ResourceController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/resources'});

// Rutas para el controlador de usuarios
api.post('/resource', ResourceController.create);
api.put('/resource/update/:id', md_auth.ensureAuth, ResourceController.update);
api.post('/resource/upload-imagen/:id', [md_auth.ensureAuth, md_upload], ResourceController.uploadImagen);
api.get('/resource/get-imagen/:imageFile', ResourceController.getImagen);
api.get('/resources/:page?', md_auth.ensureAuth, ResourceController.findByAll);
api.get('/resource/:id', md_auth.ensureAuth, ResourceController.findById);
api.delete('/resource/:id', md_auth.ensureAuth, ResourceController.destroy);

module.exports = api;