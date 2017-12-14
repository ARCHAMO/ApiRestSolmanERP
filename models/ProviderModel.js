'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var ProviderSchema = Schema(
    {
        nombre: {
            type: String,
            unique: "Nombre de cliente ya existe",
            required: "Nombre es requerido"
        },
        descripcion: String,
        celular: {
            type: String,
            required: "Celular es requerido"
        },
        telefono: String,
        email: String,
        direccion: String,
        web: String,
        userCreacionId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: "Usuario de creacion es requerido"
        },
        userModificacionId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: {
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        }
    }
);

ProviderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Provider', ProviderSchema);