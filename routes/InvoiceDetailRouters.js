'use strict'

var express = require('express');
var InvoiceDetailController = require('../controllers/InvoiceDetailController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/invoicedetail', InvoiceDetailController.create);
api.put('/invoicedetail/update/:id', md_auth.ensureAuth, InvoiceDetailController.update);
api.get('/invoicedetails/:page?', md_auth.ensureAuth, InvoiceDetailController.findByAll);
api.get('/invoicedetail/:id', md_auth.ensureAuth, InvoiceDetailController.findById);
api.delete('/invoicedetail/:id', md_auth.ensureAuth, InvoiceDetailController.destroy);

module.exports = api;