'use strict';

var fs = require('fs');
var path = require('path');
var SubTypeResource = require('../models/SubTypeResourceModel');
var mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    var subType = new SubTypeResource();
    var params = req.body;

    subType.nombre = params.nombre;
    subType.descripcion = params.descripcion;
    subType.userCreacionId = params.userCreacionId;
    subType.typeResourceId = params.typeResourceId;

    // Se realizan todas las validaciones necesarias
    subType.save((err, subTypeStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el subtipo de recurso',
                errors: err.errors
            });
        } else {
            if (!subTypeStored) {
                res.status(404).send({
                    message: 'No se ha registrado el subtipo de recurso'
                });
            } else {
                res.status(200).send({
                    subtyperesource: subTypeStored
                });
            }
        }
    });
}

function update(req, res) {
    var subTypeId = req.params.id;
    var updateParams = req.body;

    SubTypeResource.findByIdAndUpdate(subTypeId, updateParams, (err, subTypeUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el subtipo',
                errors: err.errors
            });
        } else {
            if (!subTypeUpdate) {
                res.status(404).send({
                    message: 'Subtipo no encontrado'
                });
            } else {
                res.status(200).send({
                    subtyperesource: subTypeUpdate
                });
            }
        }
    });
}

function findByAll(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    var itemsPerPage = 3;

    SubTypeResource.find().sort('nombre').paginate(page, itemsPerPage, function (error, types, total) {
        if (error) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!types) {
                res.status(404).send({message: 'No hay subtipos registrados'});
            } else {
                return res.status(200).send({
                    items: total,
                    subtyperesources: types
                });
            }
        }
    })
}

function findById(req, res) {
    var subTypeId = req.params.id;

    SubTypeResource.findById(subTypeId, (error, subtyperesource) => {
        if (error) {
            res.status(500).send({message: 'Error en la peticion.'});
        } else {
            if (!subtyperesource) {
                res.status(404).send({message: 'El subtipo no existe.'});
            } else {
                res.status(200).send({subtyperesource});
            }
        }
    });
}

function destroy(req, res) {
    var subTypeId = req.params.id;

    SubTypeResource.findByIdAndRemove(subTypeId, function (error, subTypeRemove) {
        if (error) {
            res.status(500).send({message: 'Error eliminando el subtipo.'});
        } else {
            if (!subTypeRemove) {
                res.status(404).send({message: 'El subtipo no existe.'});
            } else {
                res.status(200).send({subTypeRemove});
            }
        }
    });
}

module.exports = {
    create,
    update,
    findByAll,
    findById,
    destroy
};