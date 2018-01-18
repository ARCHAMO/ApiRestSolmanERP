'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RolSchema = Schema(
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