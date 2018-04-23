'use strict'

let express = require('express');
let QuotationDetailController = require('../controllers/QuotationDetailController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');

// Rutas para el controlador de usuarios
api.post('/quotationdetail', QuotationDetailController.create);
api.put('/quotationdetail/update/:id', md_auth.ensureAuth, QuotationDetailController.update);
api.get('/quotationdetails/:page?', md_auth.ensureAuth, QuotationDetailController.findByAll);
api.post('/quotationdetailscriteria/:page?', md_auth.ensureAuth, QuotationDetailController.findByCriteria);
api.get('/quotationdetail/:id', md_auth.ensureAuth, QuotationDetailController.findById);
api.delete('/quotationdetail/:id', md_auth.ensureAuth, QuotationDetailController.destroy);

module.exports = api;