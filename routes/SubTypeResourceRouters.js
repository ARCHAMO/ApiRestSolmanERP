'use strict'

var express = require('express');
var SubTypeResourceController = require('../controllers/SubTypeResourceController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/subtyperesource', SubTypeResourceController.create);
api.put('/subtyperesource/update/:id', md_auth.ensureAuth, SubTypeResourceController.update);
api.get('/subtyperesources/:page?', md_auth.ensureAuth, SubTypeResourceController.findByAll);
api.get('/subtyperesource/:id', md_auth.ensureAuth, SubTypeResourceController.findById);
api.delete('/subtyperesource/:id', md_auth.ensureAuth, SubTypeResourceController.destroy);

module.exports = api;