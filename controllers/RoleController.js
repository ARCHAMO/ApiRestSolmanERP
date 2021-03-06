'use strict';

let fs = require('fs');
let path = require('path');
let Customer = require('../models/CustomerModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let customer = new Customer();
    let params = req.body;

    customer.customer = params.primerNombre;
    customer.segundoNombre = params.segundoNombre;
    customer.primerApellido = params.primerApellido;
    customer.segundoApellido = params.segundoApellido;
    customer.email = params.email;
    customer.image = 'null';

    // Se realizan todas las validaciones necesarias
    if(params) {

    } else {
        customer.save((err, customerStored) => {
            if(err){
                console.log(err);
                res.status(500).send({
                    message: 'Error al guardar el cliente'
                });
            } else {
                if(!customerStored){
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
}

function update(req, res) {
    let customerId = req.params.id;
    let updateParams = req.body;

    Customer.findByIdAndUpdate(customerId, updateParams, (err, customerUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar el cliente'
            });
        } else {
            if(!customerUpdate){
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
    let customerId = req.params.id;
    let fileName = 'No subido';

    if(req.files){
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];
        console.log(fileExt.lowercase);

        if(fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif'){
            Customer.findByIdAndUpdate(customerId, {image: fileName}, (err, customerUpdate) => {
                if(!customerUpdate){
                    res.status(404).send({
                        message: 'No se ha podido actualizar el cliente'
                    });
                } else {
                    res.status(200).send({
                        customer: customerUpdate,
                        image: fileName
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
    let pathFile = './uploads/customers/' + imageFile;
    fs.exists(pathFile, function (exists) {
        if(exists){
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({message: 'No existe imagen con ese nombre...'})
        }
    })
}

function findByAll(req, res){
    let page;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    let itemsPerPage = 10;

    Customer.find().sort('nombreCompleto').paginate(page, itemsPerPage, function (error, customers, total) {
        if(error){
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if(!customers){
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
    let customerId = req.params.id;

    Customer.findById(customerId, (error, customer) => {
       if(error){
           res.status(500).send({message: 'Error en la peticion.'});
       } else {
           if(!customer){
               res.status(404).send({message: 'El cliente no existe.'});
           } else {
               res.status(500).send({customer});
           }
       }
    });
}

function destroy(req, res) {
    let customerId = req.params.id;

    Customer.findByIdAndRemove(customerId, function (error, customerRemove) {
       if(error){
           res.status(500).send({message: 'Error eliminando el cliente.'});
       } else {
           if(!customerRemove) {
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