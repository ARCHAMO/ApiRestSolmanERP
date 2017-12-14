'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema(
    {
        primerNombre: { type: String, required: true },
        segundoNombre: String,
        primerApellido: { type: String, required: true },
        segundoApellido: String,
        nombreCompleto: String,
        departamento: String,
        ciudad: String,
        barrio: String,
        direccion: String,
        fechaNacimiento: Date,
        fechaAlta: Date,
        fechaBaja: Date,
        email: { type: String, index: true},
        password: { type: String, required: true },
        imagen: String,
        rolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rol'
        },
    },
    {
        timestamps: {
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        }
    }
);

module.exports = mongoose.model('User', UserSchema);