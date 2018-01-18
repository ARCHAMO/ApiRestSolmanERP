'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');
let email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Ingrese email valido"];

let ProviderSchema = Schema(
    {
        nombreCompleto: {
            type: String,
            unique: "Nombre de cliente ya existe",
            required: "Nombre es requerido"
        },
        tipoIdentificacion: {
            type: String,
            required: "Tipo identificacion es requerido"
        },
        numeroIdentificacion: {
            type: String,
            unique: "Numero de identificacion ya existe",
            required: "Identificacion es requerida"
        },
        descripcion: String,
        celular: {
            type: String,
            required: "Celular es requerido"
        },
        telefono: String,
        email: {
            type: String,
            match: email_match
        },
        direccion: String,
        web: String,
        ciudad: String,
        estado: {
            type: String,
            enum: ['AC','IN']
        },
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

ProviderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Provider', ProviderSchema);