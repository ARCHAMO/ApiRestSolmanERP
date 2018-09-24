'use strict'

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let QuotationDetailSchema = Schema(
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
        unidad: {
            type: String,
            required: 'La unidad es requerrdo'
        },
        valorInicial: {
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
        otros: {
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