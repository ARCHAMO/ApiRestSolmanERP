'use strict';

let fs = require('fs');
let path = require('path');
let InvoiceDetail = require('../models/InvoiceDetailModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let invoiceDet = new InvoiceDetail();
    let params = req.body;

    invoiceDet.invoiceId = params.invoiceId;
    invoiceDet.typeResourceId = params.typeResourceId;
    invoiceDet.subTypeResourceId = params.subTypeResourceId;
    invoiceDet.resourceId = params.resourceId;
    invoiceDet.descripcion = params.descripcion;
    invoiceDet.consecutivo = params.consecutivo;
    invoiceDet.cantidad = params.cantidad;
    invoiceDet.valorInicial = params.valorInicial;
    invoiceDet.valorAplicado = params.valorAplicado;
    invoiceDet.interesAplicado = params.interesAplicado;
    invoiceDet.descuentoAplicado = params.descuentoAplicado;
    invoiceDet.totalNeto = params.totalNeto;
    invoiceDet.userCreacionId = params.userCreacionId;
    invoiceDet.userModificacionId = params.userModificacionId;

    invoiceDet.save((err, invoiceDetStored) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar el detalle de la factura',
                errors: err.errors
            });
        } else {
            if(!invoiceDetStored){
                res.status(404).send({
                    message: 'No se ha registrado el detalle de la factura'
                });
            } else {
                res.status(200).send({
                    invoiceDet: invoiceDetStored
                });
            }
        }
    });
}

function update(req, res) {
    let invoiceDetId = req.params.id;
    let updateParams = req.body;

    InvoiceDetail.findByIdAndUpdate(invoiceDetId, updateParams, (err, invoiceDetUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar el detalle de la factura'
            });
        } else {
            if(!invoiceDetUpdate){
                res.status(404).send({
                    message: 'No se ha podido actualizar el detalle de la factura'
                });
            } else {
                res.status(200).send({
                    invoiceDet: invoiceDetUpdate
                });
            }
        }
    });
}

function findByAll(req, res){
    let page;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    let itemsPerPage = 10;

    InvoiceDetail.find().sort('consecutivo').paginate(page, itemsPerPage, function (error, invoiceDets, total) {
        if(error){
            res.status(500).send({message: 'Error en la peticion', errors: error});
        } else {
            if(!invoiceDets){
                res.status(404).send({message: 'No hay detalle en la factura'});
            } else {
                return res.status(200).send({
                    items: total,
                    invoiceDets: invoiceDets
                });
            }
        }
    })
}

function findById(req, res) {
    let invoiceDetId = req.params.id;

    InvoiceDetail.findById(invoiceDetId, (error, invoiceDet) => {
       if(error){
           res.status(500).send({message: 'Error en la peticion.'});
       } else {
           if(!invoiceDet){
               res.status(404).send({message: 'El detalle de la actura no existe.'});
           } else {
               res.status(500).send({invoiceDet});
           }
       }
    });
}

function destroy(req, res) {
    let invoiceDetId = req.params.id;

    InvoiceDetail.findByIdAndRemove(invoiceDetId, function (error, invoiceDetRemove) {
       if(error){
           res.status(500).send({message: 'Error eliminando el detalle.'});
       } else {
           if(!invoiceDetRemove) {
               res.status(404).send({message: 'El detalle de la factura no existe.'});
           } else {
               res.status(200).send({invoiceDetRemove});
           }
       }
    });
}

module.exports = {
    create,
    update,
    findByAll,
    findById,
    destroy
};