'use strict';

let fs = require('fs');
let path = require('path');
let Quotation = require('../models/QuotationModel');
let Customer = require('../models/CustomerModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let quotation = new Quotation();
    let params = req.body;

    quotation.customerId = params.customerId;
    quotation.fechaValidez = params.fechaValidez;
    quotation.formaPago = params.formaPago;
    quotation.detalleFormaPago = params.detalleFormaPago;
    quotation.consecutivo = params.consecutivo;
    quotation.estado = params.estado;
    quotation.fechaEntrega = params.fechaEntrega;
    quotation.observaciones = params.observaciones;
    quotation.image = 'null';
    quotation.userCreacionId = params.userCreacionId;
    quotation.totalRecursos = params.totalRecursos;
    quotation.totalIva = params.totalIva;
    quotation.totalImpuesto = params.totalImpuesto;
    quotation.totalAdministracion = params.totalAdministracion;
    quotation.totalGanancia = params.totalGanancia;
    quotation.subTotal = params.subTotal;
    quotation.totalNeto = params.totalNeto;

    quotation.save((err, quotationStored) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar la cotización',
                errors: err.errors
            });
        } else {
            if(!quotationStored){
                res.status(404).send({
                    message: 'No se ha registrado la cotización'
                });
            } else {
                res.status(200).send({
                    quotation: quotationStored
                });
            }
        }
    });
}

function update(req, res) {
    let quotationId = req.params.id;
    let updateParams = req.body;

    Quotation.findByIdAndUpdate(quotationId, updateParams, (err, quotationUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar la cotización ' + err
            });
        } else {
            if(!quotationUpdate){
                res.status(404).send({
                    message: 'No se ha podido actualizar la cotización'
                });
            } else {
                res.status(200).send({
                    quotation: quotationUpdate
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    let quotationId = req.params.id;
    let fileName = 'No subido';

    if(req.files){
        let filePath = req.files.imagen.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];
        console.log(fileExt.lowercase);

        if(fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif'){
            Quotation.findByIdAndUpdate(quotationId, {image: fileName}, (err, quotationUpdate) => {
                if(!quotationUpdate){
                    res.status(404).send({
                        message: 'No se ha podido actualizar la cotización'
                    });
                } else {
                    res.status(200).send({
                        quotation: quotationUpdate,
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
    let pathFile = './uploads/quotations/' + imageFile;
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

    Quotation.find().sort('fechaCreacion').paginate(page, itemsPerPage, function (error, quotations, total) {
        Customer.populate(quotations, {path:"customerId"}, function (err, quotations) {
            if(error){
                res.status(500).send({message: 'Error en la peticion'});
            } else {
                if(!quotations){
                    res.status(404).send({message: 'No hay cotizaciones registradas'});
                } else {
                    return res.status(200).send({
                        items: total,
                        quotations: quotations
                    });
                }
            }
        });
    })
}

function findById(req, res) {
    let quotationId = req.params.id;

    Quotation.findById(quotationId, (error, quotation) => {
        Customer.populate(quotation, {path:"customerId"}, function (error, quotation) {
            if (error) {
                res.status(500).send({message: 'Error en la peticion.'});
            } else {
                if (!quotation) {
                    res.status(404).send({message: 'La cotización no existe.'});
                } else {
                    res.status(200).send(quotation);
                }
            }
        });
    });
}

function destroy(req, res) {
    let quotationId = req.params.id;

    Quotation.findByIdAndRemove(quotationId, function (error, quotationRemove) {
       if(error){
           res.status(500).send({message: 'Error eliminando la cotización.'});
       } else {
           if(!quotationRemove) {
               res.status(404).send({message: 'La cotización no existe.'});
           } else {
               res.status(200).send({quotationRemove});
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