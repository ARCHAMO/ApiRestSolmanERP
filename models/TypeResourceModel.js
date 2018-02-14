'use strict'

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let TypeResourceSchema = Schema(
    {
        nombre: {
            type: String,
            required: "Nombre del tipo es requerido",
            unique: "Nombre del tipo ya existe"
        },
        descripcion: {
            type: String,
        },
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

TypeResourceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TypeResource', TypeResourceSchema);