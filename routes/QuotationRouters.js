'use strict'

let express = require('express');
let QuotationController = require('../controllers/QuotationController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/quotations'});

// Rutas para el controlador de usuarios
api.post('/quotation', QuotationController.create);
api.put('/quotation/update/:id', md_auth.ensureAuth, QuotationController.update);
api.post('/quotation/upload-imagen/:id', [md_auth.ensureAuth, md_upload], QuotationController.uploadImagen);
api.get('/quotation/get-imagen/:imageFile', QuotationController.getImagen);
api.get('/quotations/:page?', md_auth.ensureAuth, QuotationController.findByAll);
api.get('/quotation/:id', md_auth.ensureAuth, QuotationController.findById);
api.delete('/quotation/:id', md_auth.ensureAuth, QuotationController.destroy);

module.exports = api;