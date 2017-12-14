'use strict';

var fs = require('fs');
var path = require('path');
var Quotation = require('../models/QuotationModel');
var mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    var quotation = new Quotation();
    var params = req.body;

    quotation.customerId = params.customerId;
    quotation.fechaValidez = params.fechaValidez;
    quotation.formaPago = params.formaPago;
    quotation.detalleFormaPago = params.detalleFormaPago;
    quotation.consecutivo = params.consecutivo;
    quotation.totalProductos = params.totalProductos;
    quotation.otros = params.otros;
    quotation.totalIntereses = params.totalIntereses;
    quotation.totalNeto = params.totalNeto;
    quotation.fechaEntrega = params.fechaEntrega;
    quotation.porcDescuento = params.porcDescuento;
    quotation.valorDescuento = params.valorDescuento;
    quotation.image = 'null';
    quotation.userCreacionId = params.userCreacionId;

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
    var quotationId = req.params.id;
    var updateParams = req.body;

    Quotation.findByIdAndUpdate(quotationId, updateParams, (err, quotationUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar la cotización'
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
    var quotationId = req.params.id;
    var fileName = 'No subido';

    if(req.files){
        var filePath = req.files.imagen.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
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
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/quotations/' + imageFile;
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

    Quotation.find().sort('fechaCreacion').paginate(page, itemsPerPage, function (error, quotations, total) {
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
    })
}

function findById(req, res) {
    var quotationId = req.params.id;

    Quotation.findById(quotationId, (error, quotation) => {
       if(error){
           res.status(500).send({message: 'Error en la peticion.'});
       } else {
           if(!quotation){
               res.status(404).send({message: 'La cotización no existe.'});
           } else {
               res.status(500).send({quotation});
           }
       }
    });
}

function destroy(req, res) {
    var quotationId = req.params.id;

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