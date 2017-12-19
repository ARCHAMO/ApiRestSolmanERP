'use strict';

var fs = require('fs');
var path = require('path');
var TypeResource = require('../models/TypeResourceModel');
var mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    var type = new TypeResource();
    var params = req.body;

    type.nombre = params.nombre;
    type.descripcion = params.descripcion;
    type.userCreacionId = params.userCreacionId;

    // Se realizan todas las validaciones necesarias
    type.save((err, typeStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el tipo de recurso',
                errors: err.errors
            });
        } else {
            if (!typeStored) {
                res.status(404).send({
                    message: 'No se ha registrado el tipo de recurso'
                });
            } else {
                res.status(200).send({
                    customer: typeStored
                });
            }
        }
    });
}

function update(req, res) {
    var typeId = req.params.id;
    var updateParams = req.body;

    TypeResource.findByIdAndUpdate(typeId, updateParams, (err, typeUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el tipo',
                errors: err.errors
            });
        } else {
            if (!typeUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el tipo'
                });
            } else {
                res.status(200).send({
                    typeresource: typeUpdate
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

    TypeResource.find().sort('nombre').paginate(page, itemsPerPage, function (error, types, total) {
        if (error) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!types) {
                res.status(404).send({message: 'No hay tipos registrados'});
            } else {
                return res.status(200).send({
                    items: total,
                    typeresources: types
                });
            }
        }
    })
}

function findById(req, res) {
    var customerId = req.params.id;
    console.log(customerId);

    TypeResource.findById(customerId, (error, customer) => {
        if (error) {
            res.status(500).send({message: 'Error en la peticion.'});
        } else {
            if (!customer) {
                res.status(404).send({message: 'El cliente no existe.'});
            } else {
                res.status(200).send({customer});
            }
        }
    });
}

function destroy(req, res) {
    var typeId = req.params.id;

    TypeResource.findByIdAndRemove(typeId, function (error, typeRemove) {
        if (error) {
            res.status(500).send({message: 'Error eliminando el tipo.'});
        } else {
            if (!typeRemove) {
                res.status(404).send({message: 'El tipo no existe.'});
            } else {
                res.status(200).send({typeRemove});
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