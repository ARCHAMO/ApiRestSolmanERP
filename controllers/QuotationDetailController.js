'use strict';

var fs = require('fs');
var path = require('path');
var QuotationDetail = require('../models/QuotationDetailModel');
var mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    var quotationDetail = new QuotationDetail();
    var params = req.body;

    quotationDetail.quotationId = params.quotationId;
    quotationDetail.typeResourceId = params.typeResourceId;
    quotationDetail.subTypeResourceId = params.subTypeResourceId;
    quotationDetail.resourceId = params.resourceId;
    quotationDetail.descripcion = params.descripcion;
    quotationDetail.consecutivo = params.consecutivo;
    quotationDetail.cantidad = params.cantidad;
    quotationDetail.valorInicial = params.valorInicial;
    quotationDetail.valorAplicado = params.valorAplicado;
    quotationDetail.interesAplicado = params.interesAplicado;
    quotationDetail.descuentoAplicado = params.descuentoAplicado;
    quotationDetail.totalNeto = params.totalNeto;
    quotationDetail.userCreacionId = params.userCreacionId;
    quotationDetail.valorInicial = params.segundoNombre;

    quotationDetail.save((err, quotationDetailStored) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar el detalle de la cotización',
                errors: err.errors
            });
        } else {
            if(!quotationDetailStored){
                res.status(404).send({
                    message: 'No se ha registrado el detalle de la cotización'
                });
            } else {
                res.status(200).send({
                    quotationDetailStored: quotationDetailStored
                });
            }
        }
    });
}

function update(req, res) {
    var quotationDetailId = req.params.id;
    var updateParams = req.body;

    QuotationDetail.findByIdAndUpdate(quotationDetailId, updateParams, (err, quotationDetailUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar el detalle de la cotización'
            });
        } else {
            if(!quotationDetailUpdate){
                res.status(404).send({
                    message: 'No se ha podido actualizar el detalle de la cotización'
                });
            } else {
                res.status(200).send({
                    quotationDetailUpdate: quotationDetailUpdate
                });
            }
        }
    });
}

function findByAll(req, res){
    if(req.params.page){
        var page = req.params.page;
    } else {
        var page = 1;
    }
    var itemsPerPage = 3;

    QuotationDetail.find().sort('fechaCreacion').paginate(page, itemsPerPage, function (error, quotationDetails, total) {
        if(error){
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if(!quotationDetails){
                res.status(404).send({message: 'No hay detalle de cotización'});
            } else {
                return res.status(200).send({
                    items: total,
                    quotationDetails: quotationDetails
                });
            }
        }
    })
}

function findById(req, res) {
    var quotationDetailId = req.params.id;

    QuotationDetail.findById(quotationDetailId, (error, quotationDetail) => {
       if(error){
           res.status(500).send({message: 'Error en la peticion.'});
       } else {
           if(!quotationDetail){
               res.status(404).send({message: 'El detalle de la cotizacion no existe.'});
           } else {
               res.status(500).send({quotationDetail});
           }
       }
    });
}

function destroy(req, res) {
    var quotationDetailId = req.params.id;

    QuotationDetail.findByIdAndRemove(quotationDetailId, function (error, quotationDetailRemove) {
       if(error){
           res.status(500).send({message: 'Error eliminando el cliente.'});
       } else {
           if(!quotationDetailRemove) {
               res.status(404).send({message: 'El detalle de la cotizacion no existe.'});
           } else {
               res.status(200).send({quotationDetailRemove});
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