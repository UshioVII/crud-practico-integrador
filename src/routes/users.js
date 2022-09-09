var express = require('express');
var router = express.Router();

const { register, login,  processRegister, processLogin } = require('../controllers/userController'); //-userController-//

const registerValidator = require('../validation/registerValidator'); //-Require registerValidator-//
const loginValidator = require('../validation/loginValidator'); //-Require loginValidator-//

/* register routes */
router.get('/register', register) 
router.post('/register', registerValidator, processRegister)
router.get('/login', login)
router.post('/login', loginValidator, processLogin)

module.exports = router;
