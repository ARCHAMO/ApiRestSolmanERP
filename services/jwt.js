'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'clave_secreta_mi_token';

exports.createToken = function(user){
    let payload = {
        sub: user._id,
        primerNombre: user.primerNombre,
        primerApellido: user.primerApellido,
        email: user.email,
        image: user.image,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret)
};
