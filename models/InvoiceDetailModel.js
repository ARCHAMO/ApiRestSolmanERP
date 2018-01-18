'use strict'

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let InvoiceDetailSchema = Schema(
    {
        invoiceId: {
            type: Schema.ObjectId,
            ref: 'Invoice'
        },
        typeResourceId: {
            type: Schema.ObjectId,
            ref: 'TypeResource'
        },
        subTypeResourceId: {
            type: Schema.ObjectId,
            ref: 'SubTypeResource'
        },
        resourceId: {
            type: Schema.ObjectId,
            ref: 'Resource'
        },
        descripcion: String,
        consecutivo: {
            type: Number,
            required: 'El numero de consecutivo es requerido'
        },
        cantidad: {
            type: Number,
            default: 0
        },
        valorInicial: {
            type: Number,
            default: 0
        },
        valorAplicado: {
            type: Number,
            default: 0
        },
        interesAplicado: {
            type: Number,
            default: 0
        },
        descuentoAplicado: {
            type: Number,
            default: 0
        },
        totalNeto: {
            type: Number,
            default: 0
        },
        userCreacionId: {
            type: Schema.ObjectId,
            ref: 'User',
            required: 'Usuario de creacion es requerido'
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

InvoiceDetailSchema.plugin(uniqueValidator);

module.exports = mongoose.model('InvoiceDetail', InvoiceDetailSchema);