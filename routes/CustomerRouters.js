'use strict'

let express = require('express');
let CustomerController = require('../controllers/CustomerController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/customers'});

// Rutas para el controlador de usuarios
api.post('/customer', CustomerController.create);
api.put('/customer/update/:id', md_auth.ensureAuth, CustomerController.update);
api.post('/customer/upload-imagen/:id', [md_auth.ensureAuth, md_upload], CustomerController.uploadImagen);
api.get('/customer/get-imagen/:imageFile', CustomerController.getImagen);
api.get('/customers/:page?', md_auth.ensureAuth, CustomerController.findByAll);
api.get('/customer/:id', md_auth.ensureAuth, CustomerController.findById);
api.delete('/customer/:id', md_auth.ensureAuth, CustomerController.destroy);

module.exports = api;