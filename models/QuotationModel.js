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
        totalRecursos: Number,
        otros: Number,
        totalIntereses: Number,
        totalNeto: Number,
        estado: String,
        fechaEntrega: Date,
        fechaAnulacion: Date,
        descripcionAnulacion: String,
        porcDescuento: Number,
        valorDescuento: Number,
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