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
        cantidad: {
            type: Number,
            default: 0
        },
        unidad: {
            type: String,
            required: 'La unidad es requerrdo'
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
        valorUnitario: {
            type: Number,
            default: 0
        },
        porcIvaAplicado: {
            type: Number,
            default: 0
        },
        valorIvaAplicado: {
            type: Number,
            default: 0
        },
        porcImpAplicado: {
            type: Number,
            default: 0
        },
        valorImpAplicado: {
            type: Number,
            default: 0
        },
        porcImprevistosAplicado: {
            type: Number,
            default: 0
        },
        valorImprevistosAplicado: {
            type: Number,
            default: 0
        },
        porcAdmAplicado: {
            type: Number,
            default: 0
        },
        valorAdmAplicado: {
            type: Number,
            default: 0
        },
        porcGanAplicado: {
            type: Number,
            default: 0
        },
        valorGanAplicado: {
            type: Number,
            default: 0
        },
        subTotal: {
            type: Number,
            default: 0
        },
        totalNeto: {
            type: Number,
            default: 0
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