'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var ResourceSchema = Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true
        },
        descripcion: String,
        typeResourceId: {
            type: Schema.ObjectId,
            ref: 'TypeResource',
            required: "Tipo de recurso es requerido"
        },
        subTypeResourceId: {
            type: Schema.ObjectId,
            ref: 'SubTypeResource',
            required: "SubTipo de recurso es requerido"
        },
        codigo: {
            type: String,
            required: true,
            unique: "El codigo ya se encuentra utilizado"
        },
        valorUnitario: {
            type: Number,
            default: 0
        },
        porcDescuento: {
            type: Number,
            default: 0
        },
        interes: {
            type: Number,
            default: 0
        },
        unidad: String,
        imagen: String,
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

ResourceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Resource', ResourceSchema);