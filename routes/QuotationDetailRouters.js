'use strict'

var express = require('express');
var QuotationDetailController = require('../controllers/QuotationDetailController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

// Rutas para el controlador de usuarios
api.post('/quotationdetail', QuotationDetailController.create);
api.put('/quotationdetail/update/:id', md_auth.ensureAuth, QuotationDetailController.update);
api.get('/quotationdetails/:page?', md_auth.ensureAuth, QuotationDetailController.findByAll);
api.get('/quotationdetail/:id', md_auth.ensureAuth, QuotationDetailController.findById);
api.delete('/quotationdetail/:id', md_auth.ensureAuth, QuotationDetailController.destroy);

module.exports = api;