'use strict';

let fs = require('fs');
let path = require('path');
let Provider = require('../models/ProviderModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let provider = new Provider();
    let params = req.body;

    provider.tipoIdentificacion = params.tipoIdentificacion;
    provider.numeroIdentificacion = params.numeroIdentificacion;
    provider.nombreCompleto = params.nombreCompleto;
    provider.direccion = params.direccion;
    provider.ciudad = params.ciudad;
    provider.estado = params.estado;
    provider.celular = params.celular;
    provider.telefono = params.telefono;
    provider.email = params.email;
    provider.web = params.web;
    provider.imagen = 'null';
    provider.userCreacionId = params.userCreacionId;

    provider.save((err, providerStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el proveedor',
                errors: err.errors
            });
        } else {
            if (!providerStored) {
                res.status(404).send({
                    message: 'No se ha registrado el proveedor'
                });
            } else {
                res.status(200).send({
                    provider: providerStored
                });
            }
        }
    });
}

function update(req, res) {
    let providerId = req.params.id;
    let updateParams = req.body;

    Provider.findByIdAndUpdate(providerId, updateParams, {runValidators: true, context: 'query'}, (err, providerUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el proveedor',
                errors: err.errors
            });
        } else {
            if (!providerUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el proveedor'
                });
            } else {
                res.status(200).send({
                    provider: providerUpdate
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    let providerId = req.params.id;
    let fileName = 'No subido';

    if (req.files) {
        let filePath = req.files.imagen.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];

        if (fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif') {
            Provider.findByIdAndUpdate(providerId, {imagen: fileName}, (err, providerUpdate) => {
                if (!providerUpdate) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el proveedor'
                    });
                } else {
                    res.status(200).send({
                        provider: providerUpdate,
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
    let pathFile = './uploads/providers/' + imageFile;
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
    let itemsPerPage = 3;

    Provider.find().sort('nombre').paginate(page, itemsPerPage, function (error, providers, total) {
        if (error) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!providers) {
                res.status(404).send({message: 'No hay proveedores registrados'});
            } else {
                return res.status(200).send({
                    items: total,
                    providers: providers
                });
            }
        }
    })
}

function findById(req, res) {
    let providerId = req.params.id;

    Provider.findById(providerId, (error, provider) => {
        if (error) {
            res.status(500).send({message: 'Error en la peticion.'});
        } else {
            if (!provider) {
                res.status(404).send({message: 'El proveedor no existe.'});
            } else {
                res.status(200).send(provider);
            }
        }
    });
}

function destroy(req, res) {
    let providerId = req.params.id;

    Provider.findByIdAndRemove(providerId, function (error, providerRemove) {
        if (error) {
            res.status(500).send({message: 'Error eliminando el proveedor.'});
        } else {
            if (!providerRemove) {
                res.status(404).send({message: 'El proveedor no existe.'});
            } else {
                res.status(200).send({providerRemove});
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