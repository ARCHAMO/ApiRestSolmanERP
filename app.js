'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargamos las rutas
var customerRouters = require('./routes/CustomerRouters');
var invoiceDetailRouters = require('./routes/InvoiceDetailRouters');
var invoiceRouters = require('./routes/InvoiceRouters');
var providerRouters = require('./routes/ProviderRouters');
var quotationDetailRouters = require('./routes/QuotationDetailRouters');
var quotationRouters = require('./routes/QuotationRouters');
var resourceRouters = require('./routes/ResourceRouters');
var roleRouters = require('./routes/RoleRouters');
var settingRouters = require('./routes/SettingRouters');
var subTypeResourceRouters = require('./routes/SubTypeResourceRouters');
var typeResourceRouters = require('./routes/TypeResourceRouters');
var userRouters = require('./routes/UserRouters');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configuramos las cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas base
app.use('/api', customerRouters);
app.use('/api', invoiceDetailRouters);
app.use('/api', invoiceRouters);
app.use('/api', providerRouters);
app.use('/api', quotationDetailRouters);
app.use('/api', quotationRouters);
app.use('/api', resourceRouters);
app.use('/api', roleRouters);
app.use('/api', settingRouters);
app.use('/api', subTypeResourceRouters);
app.use('/api', typeResourceRouters);
app.use('/api', userRouters);

module.exports = app;


