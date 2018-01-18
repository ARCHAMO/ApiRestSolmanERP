'use strict'

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let InvoiceSchema = Schema(
    {
        customerId: {
            type: Schema.ObjectId,
            ref: 'Customer'
        },
        qoutationId: {
            type: Schema.ObjectId,
            ref: 'Quotation'
        },
        formaPago: {
            type: String,
            required: 'Forma de pago es requerida'
        },
        detalleFormaPago: String,
        consecutivo: {
            type: Number,
            required: 'Consecutivo es requerido',
            unique: 'Consecutivo ya utilizado'
        },
        totalProductos: {
            type: Number,
            default: 0
        },
        otros: Number,
        totalIntereses: {
            type: Number,
            default: 0
        },
        totalNeto: {
            type: Number,
            default: 0
        },
        fechaEntrega: Date,
        porcDescuento: {
            type: Number,
            default: 0
        },
        valorDescuento: {
            type: Number,
            default: 0
        },
        imagen: String,
        userCreacionId: {
            type: Schema.ObjectId,
            ref: 'User'
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

InvoiceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Invoice', InvoiceSchema);