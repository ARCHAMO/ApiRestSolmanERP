'use strict'

var express = require('express');
var RoleController = require('../controllers/RoleController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/role', RoleController.create);
api.put('/role/update/:id', md_auth.ensureAuth, RoleController.update);
api.get('/role/:page?', md_auth.ensureAuth, RoleController.findByAll);
api.get('/role/:id', md_auth.ensureAuth, RoleController.findById);
api.delete('/role/:id', md_auth.ensureAuth, RoleController.destroy);

module.exports = api;