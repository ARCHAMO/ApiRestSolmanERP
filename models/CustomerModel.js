'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Ingrese email valido"];
var val_sex = ['M','F','I'];

var CustomerSchema = Schema(
    {
        tipoIdentificacion: {
            type: String,
            required: "Tipo identificacion es requerido"
        },
        numeroIdentificacion: {
            type: String,
            unique: "Numero de identificacion ya existe",
            required: "Identificacion es requerida"
        },
        nombreCompleto: {
            type: String,
            unique: "Nombre de cliente ya existe",
            required: "Nombre es requerido"
        },
        direccion: String,
        ciudad: String,
        estado: {
            type: String,
            enum: ['AC','IN']
        },
        celular: String,
        telefono: String,
        sexo: {
            type: String,
            enum: {
                values: val_sex,
                message: 'Valor invalido'
            }
        },
        email: {
            type: String,
            match: email_match
        },
        web: String,
        imagen: String,
        userCreacionId: {
            type: Schema.ObjectId,
            ref: 'User',
            required: "Usuario de creacion es requerido"
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

CustomerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Customer', CustomerSchema);