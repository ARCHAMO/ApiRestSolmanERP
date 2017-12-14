'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = Schema(
    {
        estado: String,
        diasValCotizacion: Number,
        iva: Number,
        impuestos: Number,
        imprevistos: Number,
        administracion: Number,
        ganancia: Number
    },
    {
        timestamps: {
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        }
    }
);

module.exports = mongoose.model('Setting', SettingSchema);