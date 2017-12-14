'use strict';

var fs = require('fs');
var path = require('path');
var Provider = require('../models/ProviderModel');
var mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    var provider = new Provider();
    var params = req.body;

    provider.nombre = params.nombre;
    provider.descripcion = params.descripcion;
    provider.celular = params.celular;
    provider.telefono = params.telefono;
    provider.email = params.email;
    provider.direccion = params.direccion;
    provider.web = params.web;
    provider.userCreacionId = params.userCreacionId;
    provider.userModificacionId = params.userModificacionId;
    provider.image = 'null';

    provider.save((err, providerStored) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar el proveedor',
                errors: err.errors
            });
        } else {
            if(!providerStored){
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
    var providerId = req.params.id;
    var updateParams = req.body;

    Provider.findByIdAndUpdate(providerId, updateParams, (err, providerUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar el proveedor'
            });
        } else {
            if(!providerUpdate){
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
    var providerId = req.params.id;
    var fileName = 'No subido';

    if(req.files){
        var filePath = req.files.imagen.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if(fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif'){
            Provider.findByIdAndUpdate(providerId, {imagen: fileName}, (err, providerUpdate) => {
                if(!providerUpdate){
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
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/providers/' + imageFile;
    fs.exists(pathFile, function (exists) {
        if(exists){
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({message: 'No existe imagen con ese nombre...'})
        }
    })
}

function findByAll(req, res){
    if(req.params.page){
        var page = req.params.page;
    } else {
        var page = 1;
    }
    var itemsPerPage = 3;

    Provider.find().sort('nombre').paginate(page, itemsPerPage, function (error, providers, total) {
        if(error){
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if(!providers){
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
    var providerId = req.params.id;

    Provider.findById(providerId, (error, provider) => {
       if(error){
           res.status(500).send({message: 'Error en la peticion.'});
       } else {
           if(!provider){
               res.status(404).send({message: 'El proveedor no existe.'});
           } else {
               res.status(500).send({provider});
           }
       }
    });
}

function destroy(req, res) {
    var providerId = req.params.id;

    Provider.findByIdAndRemove(providerId, function (error, providerRemove) {
       if(error){
           res.status(500).send({message: 'Error eliminando el proveedor.'});
       } else {
           if(!providerRemove) {
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