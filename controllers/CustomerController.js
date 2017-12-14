'use strict';

var fs = require('fs');
var path = require('path');
var Customer = require('../models/CustomerModel');
var mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    var customer = new Customer();
    var params = req.body;

    customer.tipoIdentificacion = params.tipoIdentificacion;
    customer.numeroIdentificacion = params.numeroIdentificacion;
    customer.nombreCompleto = params.nombreCompleto;
    customer.direccion = params.direccion;
    customer.ciudad = params.ciudad;
    customer.estado = params.estado;
    customer.celular = params.celular;
    customer.telefono = params.telefono;
    customer.email = params.email;
    customer.web = params.web;
    customer.imagen = 'null';
    customer.userCreacionId = params.userCreacionId;

    // Se realizan todas las validaciones necesarias
    customer.save((err, customerStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el cliente',
                errors: err.errors
            });
        } else {
            if (!customerStored) {
                res.status(404).send({
                    message: 'No se ha registrado el cliente'
                });
            } else {
                res.status(200).send({
                    customer: customerStored
                });
            }
        }
    });
}

function update(req, res) {
    var customerId = req.params.id;
    var updateParams = req.body;

    Customer.findByIdAndUpdate(customerId, updateParams, (err, customerUpdate) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error al actualizar el cliente',
                errors: err.errors
            });
        } else {
            if (!customerUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el cliente'
                });
            } else {
                res.status(200).send({
                    customer: customerUpdate
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    var customerId = req.params.id;
    var fileName = 'No subido';

    if (req.files) {
        var filePath = req.files.imagen.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
        console.log(fileExt.lowercase);

        if (fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif') {
            Customer.findByIdAndUpdate(customerId, {imagen: fileName}, (err, customerUpdate) => {
                if (!customerUpdate) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el cliente'
                    });
                } else {
                    res.status(200).send({
                        customer: customerUpdate,
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
    var pathFile = './uploads/customers/' + imageFile;
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

    Customer.find().sort('nombreCompleto').paginate(page, itemsPerPage, function (error, customers, total) {
        if (error) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!customers) {
                res.status(404).send({message: 'No hay clientes registrados'});
            } else {
                return res.status(200).send({
                    items: total,
                    customers: customers
                });
            }
        }
    })
}

function findById(req, res) {
    var customerId = req.params.id;
    console.log(customerId);

    Customer.findById(customerId, (error, customer) => {
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
    var customerId = req.params.id;

    Customer.findByIdAndRemove(customerId, function (error, customerRemove) {
        if (error) {
            res.status(500).send({message: 'Error eliminando el cliente.'});
        } else {
            if (!customerRemove) {
                res.status(404).send({message: 'El cliente no existe.'});
            } else {
                res.status(200).send({customerRemove});
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