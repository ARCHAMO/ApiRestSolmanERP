'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'clave_secreta_mi_token';

exports.ensureAuth = function (req, res, next) {

    if(!req.headers.authorization){
        return res.status(403).send({
           message: 'La petición no tiene la cabacera de autenticación'
        });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()){
            return res.status(401).send({
               message: 'El token ha expirado'
            });
        }
    } catch (ex) {
        return res.status(404).send({
           message: 'El token no es valido'
        });
    }

    req.user = payload;

    next();
};