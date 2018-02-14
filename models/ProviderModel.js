'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');
let email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Ingrese email valido"];
let val_sex = ['M','F','I'];

let ProviderSchema = Schema(
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
            unique: "Nombre de proveedor ya existe",
            required: "Nombre es requerido"
        },
        direccion: String,
        ciudad: String,
        estado: {
            type: String,
            enum: ['AC','IN']
        },
        celular: {
            type: String,
            required: "Celular es requerido"
        },
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
        descripcion: String,
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

ProviderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Provider', ProviderSchema);