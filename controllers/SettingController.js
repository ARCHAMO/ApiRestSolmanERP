'use strict';

let fs = require('fs');
let path = require('path');
let Setting = require('../models/SettingModel');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let setting = new Setting();
    let params = req.body;

    setting.estado = params.estado;
    setting.diasValCotizacion = params.diasValCotizacion;
    setting.iva = params.iva;
    setting.impuesto = params.impuesto;
    setting.imprevistos = params.imprevistos;
    setting.administracion = params.administracion;
    setting.ganancia = params.ganancia;

    setting.save((err, settingStored) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar la configuracion'
            });
        } else {
            if(!settingStored){
                res.status(404).send({
                    message: 'No se ha registrado la consfiguracion'
                });
            } else {
                res.status(200).send({
                    setting: settingStored
                });
            }
        }
    });
}

function update(req, res) {
    let settingId = req.params.id;
    let updateParams = req.body;

    Setting.findByIdAndUpdate(settingId, updateParams, (err, settingUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar la configuracion'
            });
        } else {
            if(!settingUpdate){
                res.status(404).send({
                    message: 'No se ha podido actualizar la configuracion'
                });
            } else {
                res.status(200).send({
                    setting: settingUpdate
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

    Setting.find().sort('estado').paginate(page, itemsPerPage, function (error, settings, total) {
        if(error){
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if(!settings){
                res.status(404).send({message: 'No hay configuraciones registradas'});
            } else {
                return res.status(200).send({
                    items: total,
                    settings: settings
                });
            }
        }
    })
}

function findById(req, res) {
    let settingId = req.params.id;

    Setting.findById(settingId, (error, setting) => {
       if(error){
           res.status(500).send({message: 'Error en la peticion.'});
       } else {
           if(!setting){
               res.status(404).send({message: 'La configur<cion no existe.'});
           } else {
               res.status(500).send({setting});
           }
       }
    });
}

function destroy(req, res) {
    let settingId = req.params.id;

    Setting.findByIdAndRemove(settingId, function (error, settingRemove) {
       if(error){
           res.status(500).send({message: 'Error eliminando la configuracion.'});
       } else {
           if(!settingRemove) {
               res.status(404).send({message: 'La configuracion no existe.'});
           } else {
               res.status(200).send({settingRemove});
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