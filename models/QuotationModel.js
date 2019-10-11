'use strict'

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let QuotationSchema = Schema(
    {
        customerId: {
            type: Schema.ObjectId,
            ref: 'Customer',
            required: 'El cliente es requerido'
        },
        fechaValidez: Date,
        formaPago: {
            type: String,
            required: 'Forma de pago es requerida'
        },
        detalleFormaPago: String,
        consecutivo: {
            type: Number,
            required: 'El consecutivo es requerido',
            unique: 'El consecutivo ya ha sido utilizado'
        },
        estado: String,
        fechaEntrega: Date,
        fechaAnulacion: Date,
        descripcionAnulacion: String,
        observaciones: String,
        imagen: String,
        userCreacionId: {
            type: Schema.ObjectId,
            ref: 'User',
            required: 'Usuario de creacion es requerido'
        },
        userModificacionId: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        userAnulacionId: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        totalRecursos: {
            type: Number,
            default: 0
        },
        totalIva: {
            type: Number,
            default: 0
        },
        totalImpuesto: {
            type: Number,
            default: 0
        },
        totalAdministracion: {
            type: Number,
            default: 0
        },
        totalGanancia: {
            type: Number,
            default: 0
        },
        totalDescuento: {
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

QuotationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Quotation', QuotationSchema);