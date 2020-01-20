// Third party modules
const {Router} = require('express');

// Controllers
const AuthController = require('../controllers/auth.controller');

// Private variables
const router = Router();

// Register manager
router.post('/register', AuthController.register);

// Login a manager
router.post('/login', AuthController.login);

module.exports = router;
