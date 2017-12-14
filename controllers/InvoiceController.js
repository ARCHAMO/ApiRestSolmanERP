'use strict';

var fs = require('fs');
var path = require('path');
var Invoice = require('../models/InvoiceModel');
var mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    var invoice = new Invoice();
    var params = req.body;

    invoice.customerId = params.customerId;
    invoice.qoutationId = params.qoutationId;
    invoice.formaPago = params.formaPago;
    invoice.detalleFormaPago = params.detalleFormaPago;
    invoice.consecutivo = params.consecutivo;
    invoice.totalProductos = params.totalProductos;
    invoice.otros = params.otros;
    invoice.totalIntereses = params.totalIntereses;
    invoice.totalNeto = params.totalNeto;
    invoice.fechaEntrega = params.fechaEntrega;
    invoice.porcDescuento = params.porcDescuento;
    invoice.valorDescuento = params.valorDescuento;
    invoice.image = 'null';
    invoice.userCreacionId = params.userCreacionId;
    invoice.userModificacionId = params.userModificacionId;

    invoice.save((err, invoiceStored) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar la factura',
                errors: err.errors
            });
        } else {
            if(!invoiceStored){
                res.status(404).send({
                    message: 'No se ha registrado la factura'
                });
            } else {
                res.status(200).send({
                    invoice: invoiceStored
                });
            }
        }
    });
}

function update(req, res) {
    var invoiceId = req.params.id;
    var updateParams = req.body;

    Invoice.findByIdAndUpdate(invoiceId, updateParams, (err, invoiceUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar la factura'
            });
        } else {
            if(!invoiceUpdate){
                res.status(404).send({
                    message: 'No se ha podido actualizar la factura'
                });
            } else {
                res.status(200).send({
                    invoice: invoiceUpdate
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    var invoiceId = req.params.id;
    var fileName = 'No subido';

    if(req.files){
        var filePath = req.files.imagen.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if(fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif'){
            Invoice.findByIdAndUpdate(invoiceId, {image: fileName}, (err, invoiceUpdate) => {
                if(!invoiceUpdate){
                    res.status(404).send({
                        message: 'No se ha podido actualizar la factura'
                    });
                } else {
                    res.status(200).send({
                        invoice: invoiceUpdate,
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
    var pathFile = './uploads/invoices/' + imageFile;
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

    Invoice.find().sort('fechaCreacion').paginate(page, itemsPerPage, function (error, invoices, total) {
        if(error){
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if(!invoices){
                res.status(404).send({message: 'No hay facturas registrados'});
            } else {
                return res.status(200).send({
                    items: total,
                    invoices: invoices
                });
            }
        }
    })
}

function findById(req, res) {
    var invoiceId = req.params.id;

    Invoice.findById(invoiceId, (error, invoice) => {
       if(error){
           res.status(500).send({message: 'Error en la peticion.', errors: error});
       } else {
           if(!invoice){
               res.status(404).send({message: 'La factura no existe.'});
           } else {
               res.status(500).send({invoice});
           }
       }
    });
}

function destroy(req, res) {
    var invoiceId = req.params.id;

    Invoice.findByIdAndRemove(invoiceId, function (error, invoiceRemove) {
       if(error){
           res.status(500).send({message: 'Error eliminando la factura.'});
       } else {
           if(!invoiceRemove) {
               res.status(404).send({message: 'La factura no existe.'});
           } else {
               res.status(200).send({invoiceRemove});
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