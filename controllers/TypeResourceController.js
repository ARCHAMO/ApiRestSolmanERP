'use strict';

let fs = require('fs');
let path = require('path');
let TypeResource = require('../models/TypeResourceModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let type = new TypeResource();
    let params = req.body;

    type.nombre = params.nombre;
    type.descripcion = params.descripcion;
    type.userCreacionId = params.userCreacionId;
    type.estado = params.estado;

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
    let typeId = req.params.id;
    let updateParams = req.body;

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
    let page;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    let itemsPerPage = 10;

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
    let typeId = req.params.id;

    TypeResource.findById(typeId, (error, type) => {
        if (error) {
            res.status(500).send({message: 'Error en la peticion.'});
        } else {
            if (!type) {
                res.status(404).send({message: 'El tipo no existe.'});
            } else {
                res.status(200).send(type);
            }
        }
    });
}

function destroy(req, res) {
    let typeId = req.params.id;

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