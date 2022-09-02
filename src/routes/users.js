var express = require('express');
var router = express.Router();

const { register,  processRegister } = require('../controllers/userController'); //-userController-//

const registerValidator = require('../validation/registerValidator'); //-Require registerValidator-//

/* register routes */
router.get('/register', register) 
router.post('/register', registerValidator, processRegister)

module.exports = router;
