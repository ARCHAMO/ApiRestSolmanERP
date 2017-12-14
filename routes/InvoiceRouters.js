'use strict'

var express = require('express');
var InvoiceController = require('../controllers/InvoiceController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/invoices'});

// Rutas para el controlador de usuarios
api.post('/invoice', InvoiceController.create);
api.put('/invoice/update/:id', md_auth.ensureAuth, InvoiceController.update);
api.post('/invoice/upload-imagen/:id', [md_auth.ensureAuth, md_upload], InvoiceController.uploadImagen);
api.get('/invoice/get-imagen/:imageFile', InvoiceController.getImagen);
api.get('/invoices/:page?', md_auth.ensureAuth, InvoiceController.findByAll);
api.get('/invoice/:id', md_auth.ensureAuth, InvoiceController.findById);
api.delete('/invoice/:id', md_auth.ensureAuth, InvoiceController.destroy);

module.exports = api;