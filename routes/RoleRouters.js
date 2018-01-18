'use strict'

let express = require('express');
let RoleController = require('../controllers/RoleController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/role', RoleController.create);
api.put('/role/update/:id', md_auth.ensureAuth, RoleController.update);
api.get('/role/:page?', md_auth.ensureAuth, RoleController.findByAll);
api.get('/role/:id', md_auth.ensureAuth, RoleController.findById);
api.delete('/role/:id', md_auth.ensureAuth, RoleController.destroy);

module.exports = api;