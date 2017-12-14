'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var TypeResourceSchema = Schema(
    {
        nombre: {
            type: String,
            required: "Nombre del tipo es requerido",
            unique: "Nombre del tipo ya existe"
        },
        descripcion: {
            type: String,
        },
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

TypeResourceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TypeResource', TypeResourceSchema);