'use strict';

let fs = require('fs');
let path = require('path');
let Configuration = require('../models/ConfigurationModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let configuration = new Configuration();
    let params = req.body;

    configuration.urlLogo = params.urlLogo;
    configuration.nombreEmpresa = params.nombreEmpresa;
    configuration.nit = params.nit;
    configuration.direccion = params.direccion;
    configuration.telefono = params.telefono;
    configuration.celular = params.celular;
    configuration.contacto = params.contacto;
    configuration.iva = params.iva;
    configuration.impuestos = params.impuestos;
    configuration.imprevistos = params.imprevistos;
    configuration.administracion = params.administracion;
    configuration.ganancia = params.ganancia;
    configuration.userCreacionId = params.userCreacionId;

    // Se realizan todas las validaciones necesarias
    configuration.save((err, configurationStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar la configuracion',
                errors: err.errors
            });
        } else {
            if (!configurationStored) {
                res.status(404).send({
                    message: 'No se ha registrado la configuracion'
                });
            } else {
                res.status(200).send({
                    configuration: configurationStored
                });
            }
        }
    });
}

function update(req, res) {
    let configurationId = req.params.id;
    let updateParams = req.body;

    Configuration.findByIdAndUpdate(configurationId, updateParams, {runValidators: true, context: 'query'}, (err, configurationUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el cliente',
                errors: err.errors
            });
        } else {
            if (!configurationUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar la configuracion'
                });
            } else {
                res.status(200).send({
                    configuration: configurationUpdate
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    let configurationId = req.params.id;
    let fileName = 'No subido';

    if (req.files) {
        let filePath = req.files.imagen.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];
        console.log(fileExt.lowercase);

        if (fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif') {
            Configuration.findByIdAndUpdate(configurationId, {imagen: fileName}, (err, configurationUpdate) => {
                if (!configurationUpdate) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el cliente'
                    });
                } else {
                    res.status(200).send({
                        configuration: configurationUpdate,
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
    let pathFile = './uploads/configuration/' + imageFile;
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

    Configuration.find().sort('nombreEmpresa').paginate(page, itemsPerPage, function (error, configurations, total) {
        if (error) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!configurations) {
                res.status(404).send({message: 'No hay configuracion registrada'});
            } else {
                return res.status(200).send({
                    items: total,
                    configurations: configurations
                });
            }
        }
    })
}

function findById(req, res) {
    let configurationId = req.params.id;

    Configuration.findById(configurationId, (error, configuration) => {
        if (error) {
            res.status(500).send({message: 'Error en la peticion.'});
        } else {
            if (!configuration) {
                res.status(404).send({message: 'La configuración no existe.'});
            } else {
                res.status(200).send(configuration);
            }
        }
    });
}

function destroy(req, res) {
    let configurationId = req.params.id;

    Configuration.findByIdAndRemove(configurationId, function (error, configurationRemove) {
        if (error) {
            res.status(500).send({message: 'Error eliminando la configuración.'});
        } else {
            if (!configurationRemove) {
                res.status(404).send({message: 'La configuración no existe.'});
            } else {
                res.status(200).send({configurationRemove});
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