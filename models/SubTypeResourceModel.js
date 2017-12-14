'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var SubTypeResourceSchema = Schema(
    {
        nombre: {
            type: String,
            unique: "Subtipo ya existe",
            required: "El nombre del subtipo es rquerido"
        },
        descripcion: String,
        userCreacionId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: "Usuario de creacion es requerido"
        },
        userModificacionId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        typeResourceId: {
            type: Schema.ObjectId,
            ref: 'TypeResource',
            required: "El tipo de recurso es requerido"
        },
    },
    {
        timestamps: {
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        }
    }
);

SubTypeResourceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('SubTypeResource', SubTypeResourceSchema);