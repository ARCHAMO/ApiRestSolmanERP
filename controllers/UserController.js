'use strict';

let fs = require('fs');
let path = require('path');
let User = require('../models/UserModel');
let bcrypt = require('bcrypt-nodejs');
let jwt = require('../services/jwt');
let mongoosePaginate = require('mongoose-pagination');

function create(req, res) {
    let user = new User();
    let params = req.body;

    user.primerNombre = params.primerNombre;
    user.segundoNombre = params.segundoNombre;
    user.primerApellido = params.primerApellido;
    user.segundoApellido = params.segundoApellido;
    user.password = (params.password == '') ? '123': params.password;
    user.email = params.email;
    user.profesion = params.profesion;
    user.cargo = params.cargo;
    user.image = 'null';
    user.rol = 'Operador';

    if (user.password){
        //Encritamos el paswwordc
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if(user.primerNombre != null && user.primerApellido != null && user.email != null) {
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({
                            message: 'Error al guardar el usuario'
                        });
                    } else {
                        if(!userStored){
                            res.status(404).send({
                                message: 'No se ha registrado el usuario'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: 'Rellena tados los campos'
                });
            }
        })
    } else {
        res.status(500).send({
            message: 'Introduzca la contraseña'
        });
        user.password = params.password;
    }
}

function login(req, res){
    let params = req.body;

    let email = params.email;
    let password = params.password;

    if((email == null || email == '') || (password == null || password == '')){
        res.status(404).send({
            message: 'Usuario y/o contraseña incorrecta.'
        });
    } else {
        User.findOne({
            email: email.toLowerCase()
        }, (err, user) => {
            if(err){
                res.status(500).send({
                    message: 'Error en la peticion.'
                });
            } else {
                if(!user) {
                    res.status(404).send({
                        message: 'Usuario no existe.'
                    });
                }else {
                    bcrypt.compare(password, user.password, function (err, check) {
                        if(check){
                            if(params.gethash){
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            } else {
                                res.status(200).send({
                                    user
                                });
                            }
                        } else {
                            res.status(404).send({
                                message: 'Usuario y/o contraseña incorrecta..'
                            });
                        }
                    });
                }
            }
        });
    }
}

function update(req, res) {
    let userId = req.params.id;
    let updateParams = req.body;

    User.findByIdAndUpdate(userId, updateParams, (err, userUpdate) => {
        if(err){
            res.status(500).send({
               message: 'Error al actualizar el usuario'
            });
        } else {
            if(!userUpdate){
                res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            } else {
                res.status(200).send({
                    user: userUpdate
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    let userId = req.params.id;
    let fileName = 'No subido';

    if(req.files){
        let filePath = req.files.imagen.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];

        if(fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif'){
            User.findByIdAndUpdate(userId, {imagen: fileName}, (err, userUpdate) => {
                if(!userUpdate){
                    res.status(404).send({
                        message: 'No se ha podido actualizar el usuario'
                    });
                } else {
                    res.status(200).send({
                        user: userUpdate,
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
    let imageFile = req.params.imageFile;
    let pathFile = './uploads/users/' + imageFile;
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

    User.find().sort('primerApellido').paginate(page, itemsPerPage, function (error, users, total) {
        if(error){
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if(!users){
                res.status(404).send({message: 'No hay usuarios registrados'});
            } else {
                return res.status(200).send({
                    items: total,
                    users: users
                });
            }
        }
    })
}

function findById(req, res) {
    let userId = req.params.id;

    User.findById(userId, (error, user) => {
       if(error){
           res.status(500).send({message: 'Error en la peticion.'});
       } else {
           if(!user){
               res.status(404).send({message: 'El artista no existe.'});
           } else {
               res.status(500).send({user});
           }
       }
    });
}

function destroy(req, res) {
    let userId = req.params.id;

    User.findByIdAndRemove(userId, function (error, userRemove) {
       if(error){
           res.status(500).send({message: 'Error eliminando el usuario.'});
       } else {
           if(!userRemove) {
               res.status(404).send({message: 'El usuario no existe.'});
           } else {
               res.status(200).send({userRemove});
           }
       }
    });
}

module.exports = {
    create,
    login,
    update,
    uploadImagen,
    getImagen,
    findByAll,
    findById,
    destroy
};