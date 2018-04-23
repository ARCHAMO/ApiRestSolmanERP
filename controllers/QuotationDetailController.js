'use strict';

let fs = require('fs');
let path = require('path');
let QuotationDetail = require('../models/QuotationDetailModel');
let Resource = require('../models/ResourceModel');
let SubTypeResource = require('../models/SubTypeResourceModel');
let TypeResource = require('../models/TypeResourceModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let quotationDetail = new QuotationDetail();
    let params = req.body;

    console.log(params);

    quotationDetail.quotationId = params.quotationId;
    quotationDetail.typeResourceId = params.typeResourceId;
    quotationDetail.subTypeResourceId = params.subTypeResourceId;
    quotationDetail.resourceId = params.resourceId;
    quotationDetail.descripcion = params.descripcion;
    quotationDetail.consecutivo = params.consecutivo;
    quotationDetail.cantidad = params.cantidad;
    quotationDetail.unidad = params.unidad;
    quotationDetail.valorInicial = params.valorInicial;
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
    let quotationDetailId = req.params.id;
    let updateParams = req.body;

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
    let page;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    let itemsPerPage = 10;

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

function findByCriteria(req, res) {
    let page;
    let criterios = req.body;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    let itemsPerPage = 10;

    QuotationDetail.find(criterios).sort('fechaCreacion').paginate(page, itemsPerPage, function (error, quotationDetails, total) {
        Resource.populate(quotationDetails, {path:"resourceId"}, function (err, quotationDetails) {
            TypeResource.populate(quotationDetails, {path:"typeResourceId"}, function (err, quotationDetails) {
                SubTypeResource.populate(quotationDetails, {path:"subTypeResourceId"}, function (err, quotationDetails) {
                    if (error) {
                        res.status(500).send({message: 'Error en la peticion'});
                    } else {
                        if (!quotationDetails) {
                            res.status(404).send({message: 'No hay detalles registrados'});
                        } else {
                            return res.status(200).send({
                                items: total,
                                quotationDetails: quotationDetails
                            });
                        }
                    }
                });
            });
        })
    })
}

function findById(req, res) {
    let quotationDetailId = req.params.id;

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
    let quotationDetailId = req.params.id;

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
    findByCriteria,
    findById,
    destroy
};