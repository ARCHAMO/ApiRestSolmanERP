'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Cargamos las rutas
let customerRouters = require('./routes/CustomerRouters');
let invoiceDetailRouters = require('./routes/InvoiceDetailRouters');
let invoiceRouters = require('./routes/InvoiceRouters');
let providerRouters = require('./routes/ProviderRouters');
let quotationDetailRouters = require('./routes/QuotationDetailRouters');
let quotationRouters = require('./routes/QuotationRouters');
let resourceRouters = require('./routes/ResourceRouters');
let roleRouters = require('./routes/RoleRouters');
let settingRouters = require('./routes/SettingRouters');
let subTypeResourceRouters = require('./routes/SubTypeResourceRouters');
let typeResourceRouters = require('./routes/TypeResourceRouters');
let userRouters = require('./routes/UserRouters');
let configurationRouters = require('./routes/ConfigurationRouters');

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
app.use('/api', configurationRouters);

module.exports = app;


