const { check, body } = require('express-validator');
const { loadUsers} = require('../data/dbModule');
let bcryptjs = require('bcryptjs');

module.exports = [

    check('email').notEmpty().withMessage('Debes completar el email.')
    .bail()
    .isEmail().withMessage('Ingre un email válido.'),

    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .custom((value, {req}) => {let users = loadUsers().find(users => users.email === req.body.email && bcryptjs.compareSync(value, users.password));
    return users ? true : false

    }).withMessage('Credenciales inválidas')
]