'use strict';

let fs = require('fs');
let path = require('path');
let Quotation = require('../models/QuotationModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let quotation = new Quotation();
    let params = req.body;

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
    let quotationId = req.params.id;
    let updateParams = req.body;

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
    if(req.params.page){
        let page = req.params.page;
    } else {
        let page = 1;
    }
    let itemsPerPage = 3;

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
    let quotationId = req.params.id;

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