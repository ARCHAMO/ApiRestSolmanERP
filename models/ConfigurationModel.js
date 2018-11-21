'use strict'

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let ConfigurationSchema = Schema(
    {
        urlLogo: String,
        nombreEmpresa: String,
        nit: String,
        direccion: String,
        telefono: String,
        celular: String,
        contacto: String,
        iva: Number,
        impuestos: Number,
        imprevistos: Number,
        administracion: Number,
        ganancia: Number,
        userCreacionId: {
            type: Schema.ObjectId,
            ref: 'User',
            required: "Usuario de creacion es requerido"
        },
        userModificacionId: {
            type: Schema.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: {
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        }
    }
);

ConfigurationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Configuration', ConfigurationSchema);