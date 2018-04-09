'use strict';

let fs = require('fs');
let path = require('path');
let Resource = require('../models/ResourceModel');
let SubTypeResource = require('../models/SubTypeResourceModel');
let TypeResource = require('../models/TypeResourceModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let resource = new Resource();
    let params = req.body;

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
    resource.estado = params.estado;
    resource.userCreacionId = params.userCreacionId;

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
    let customerId = req.params.id;
    let updateParams = req.body;

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
    let resourceId = req.params.id;
    let fileName = 'No subido';

    if (req.files) {
        let filePath = req.files.imagen.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];

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
    let imageFile = req.params.imageFile;
    let pathFile = './uploads/resources/' + imageFile;
    fs.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({message: 'No existe imagen con ese nombre...'})
        }
    })
}

function findByAll(req, res) {
    let page;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    let itemsPerPage = 10;

    Resource.find().sort('nombre').paginate(page, itemsPerPage, function (error, resources, total) {
        TypeResource.populate(resources, {path:"typeResourceId"}, function (err, resources) {
            SubTypeResource.populate(resources, {path:"subTypeResourceId"}, function (err, resources) {
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
            });
        });
    })
}

function findByCriteria(req, res) {
    let page;
    let criterios = req.body;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    let itemsPerPage = 10;

    Resource.find(criterios).sort('nombre').paginate(page, itemsPerPage, function (error, resources, total) {
        TypeResource.populate(resources, {path:"typeResourceId"}, function (err, resources) {
            SubTypeResource.populate(resources, {path:"subTypeResourceId"}, function (err, resources) {
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
            });
        });
    })
}

function findById(req, res) {
    let resourceId = req.params.id;

    Resource.findById(resourceId, (error, resource) => {
        TypeResource.populate(resource, {path:"typeResourceId"}, function (err, resource) {
            SubTypeResource.populate(resource, {path:"subTypeResourceId"}, function (err, resources) {
                if (error) {
                    res.status(500).send({message: 'Error en la peticion.'});
                } else {
                    if (!resource) {
                        res.status(404).send({message: 'El recurso no existe.'});
                    } else {
                        res.status(200).send(resource);
                    }
                }
            });
        });
    });
}

function destroy(req, res) {
    let resourceId = req.params.id;

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
    findByCriteria,
    findById,
    destroy
};