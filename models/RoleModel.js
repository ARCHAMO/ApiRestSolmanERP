'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolSchema = Schema(
    {
        nombre: { type: String, required: true },
        descripcion: String,
        userCreacionId: { type: Schema.Types.ObjectId, ref: 'User' },
        userModificacionId: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: {
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        }
    }
);

module.exports = mongoose.model('Rol', RolSchema);