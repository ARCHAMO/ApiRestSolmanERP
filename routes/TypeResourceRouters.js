'use strict'

var express = require('express');
var TypeResourceController = require('../controllers/TypeResourceController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/typeresource', TypeResourceController.create);
api.put('/typeresource/update/:id', md_auth.ensureAuth, TypeResourceController.update);
api.get('/typeresources/:page?', md_auth.ensureAuth, TypeResourceController.findByAll);
api.get('/typeresource/:id', md_auth.ensureAuth, TypeResourceController.findById);
api.delete('/typeresource/:id', md_auth.ensureAuth, TypeResourceController.destroy);

module.exports = api;