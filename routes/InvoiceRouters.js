'use strict'

let express = require('express');
let InvoiceController = require('../controllers/InvoiceController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/invoices'});

// Rutas para el controlador de usuarios
api.post('/invoice', InvoiceController.create);
api.put('/invoice/update/:id', md_auth.ensureAuth, InvoiceController.update);
api.post('/invoice/upload-imagen/:id', [md_auth.ensureAuth, md_upload], InvoiceController.uploadImagen);
api.get('/invoice/get-imagen/:imageFile', InvoiceController.getImagen);
api.get('/invoices/:page?', md_auth.ensureAuth, InvoiceController.findByAll);
api.get('/invoice/:id', md_auth.ensureAuth, InvoiceController.findById);
api.delete('/invoice/:id', md_auth.ensureAuth, InvoiceController.destroy);

module.exports = api;