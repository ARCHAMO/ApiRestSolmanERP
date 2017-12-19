'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var QuotationDetailSchema = Schema(
    {
        quotationId: {
            type: Schema.ObjectId,
            ref: 'Quotation',
            required: 'El codigo de la cotización es requerida'
        },
        typeResourceId: {
            type: Schema.ObjectId,
            ref: 'TypeResource',
            required: 'El tipo de recurso es requerido'
        },
        subTypeResourceId: {
            type: Schema.ObjectId,
            ref: 'SubTypeResource',
            required: 'El subtipo de recurso es requerido'
        },
        resourceId: {
            type: Schema.ObjectId,
            ref: 'Resource',
            required: 'El recurso es requerido'
        },
        descripcion: String,
        consecutivo: {
            type: Number,
            required: 'El consecutivo es requerrdo'
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
            required: 'Usuario es requerido'
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

QuotationDetailSchema.plugin(uniqueValidator);

module.exports = mongoose.model('QuotationDetail', QuotationDetailSchema);