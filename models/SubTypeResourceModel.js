'use strict'

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let SubTypeResourceSchema = Schema(
    {
        nombre: {
            type: String,
            unique: "Subtipo ya existe",
            required: "El nombre del subtipo es rquerido"
        },
        descripcion: {
            type: String,
        },
        estado: {
            type: String,
            enum: ['AC','IN']
        },
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
            required: "El subtipo de recurso es requerido"
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