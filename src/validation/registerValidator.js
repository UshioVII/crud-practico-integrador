const { check } = require('express-validator');



module.exports = [
    check('firstname')
        .notEmpty()
        .withMessage('Debes completar el nombre.')
        .bail()
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener un minimo de 2 caracteres.'),
        
    check('lastname')
        .notEmpty()
        .withMessage('Debes completar el apellido.')
        .bail()
        .isLength({ min: 2 })
        .withMessage('El segundo nombre debe tener un minimo de 2 caracteres.'),

    check('email')
        .notEmpty()
        .withMessage('Debes completar el email.')
        .bail()
        .isEmail().withMessage('Ingre un email válido.'),

    check('password')
        .notEmpty()
        .withMessage('Debes completar la contraseña')
        .bail()
        .isLength({ min: 5 })
        .withMessage('La contraseña debe tener al menos 5 caracteres')
]