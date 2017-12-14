'use strict'

var express = require('express');
var SettingController = require('../controllers/SettingController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/setting', SettingController.create);
api.put('/setting/update/:id', md_auth.ensureAuth, SettingController.update);
api.get('/settings/:page?', md_auth.ensureAuth, SettingController.findByAll);
api.get('/setting/:id', md_auth.ensureAuth, SettingController.findById);
api.delete('/setting/:id', md_auth.ensureAuth, SettingController.destroy);

module.exports = api;