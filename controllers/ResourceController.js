'use strict';

var fs = require('fs');
var path = require('path');
var Resource = require('../models/ResourceModel');
var mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    var resource = new Resource();
    var params = req.body;

    resource.nombre = params.nombre;
    resource.descripcion = params.descripcion;
    resource.typeResourceId = params.typeResourceId;
    resource.subTypeResourceId = params.subTypeResourceId;
    resource.codigo = params.codigo;
    resource.valorUnitario = params.valorUnitario;
    resource.porcDescuento = params.porcDescuento;
    resource.interes = params.interes;
    resource.unidad = params.unidad;
    resource.imagen = 'null';
    resource.userCreacionId = params.userCreacionId;
    resource.userModificacionId = params.userModificacionId;

    // Se realizan todas las validaciones necesarias
    resource.save((err, resourceStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el recurso',
                errors: err.errors
            });
        } else {
            if (!resourceStored) {
                res.status(404).send({
                    message: 'No se ha registrado el recurso'
                });
            } else {
                res.status(200).send({
                    resource: resourceStored
                });
            }
        }
    });
}

function update(req, res) {
    var customerId = req.params.id;
    var updateParams = req.body;

    Resource.findByIdAndUpdate(customerId, updateParams, (err, resourceUpdate) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error al actualizar el recurso',
                errors: err.errors
            });
        } else {
            if (!resourceUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el recurso'
                });
            } else {
                res.status(200).send({
                    resource: resourceUpdate
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    var resourceId = req.params.id;
    var fileName = 'No subido';

    if (req.files) {
        var filePath = req.files.imagen.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif') {
            Resource.findByIdAndUpdate(resourceId, {imagen: fileName}, (err, resourceUpdate) => {
                if (!resourceUpdate) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el recurso'
                    });
                } else {
                    res.status(200).send({
                        resource: resourceUpdate,
                        imagen: fileName
                    });
                }
            });
        } else {
            res.status(200).send({message: 'Extension de archivo no valida.'})
        }
    } else {
        res.status(200).send({
            message: 'No has subido ninguna imagen.'
        });
    }
}

function getImagen(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/resources/' + imageFile;
    fs.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({message: 'No existe imagen con ese nombre...'})
        }
    })
}

function findByAll(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    var itemsPerPage = 3;

    Resource.find().sort('nombre').paginate(page, itemsPerPage, function (error, resources, total) {
        if (error) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!resources) {
                res.status(404).send({message: 'No hay recursos registrados'});
            } else {
                return res.status(200).send({
                    items: total,
                    resources: resources
                });
            }
        }
    })
}

function findById(req, res) {
    var resourceId = req.params.id;

    Resource.findById(resourceId, (error, resource) => {
        if (error) {
            res.status(500).send({message: 'Error en la peticion.'});
        } else {
            if (!resource) {
                res.status(404).send({message: 'El recurso no existe.'});
            } else {
                res.status(200).send({resource});
            }
        }
    });
}

function destroy(req, res) {
    var resourceId = req.params.id;

    Resource.findByIdAndRemove(resourceId, function (error, resourceRemove) {
        if (error) {
            res.status(500).send({message: 'Error eliminando el recurso.'});
        } else {
            if (!resourceRemove) {
                res.status(404).send({message: 'El recurso no existe.'});
            } else {
                res.status(200).send({resourceRemove});
            }
        }
    });
}

module.exports = {
    create,
    update,
    uploadImagen,
    getImagen,
    findByAll,
    findById,
    destroy
};