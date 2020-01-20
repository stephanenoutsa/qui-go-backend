// Third party modules
const {Router} = require('express');

// Controllers
const ManagerController = require('../controllers/manager.controller');

// Private variables
const router = Router();

// Retrieve all managers
router.get('/', ManagerController.findAll);

// Retrieve single manager by id
router.get('/:id', ManagerController.findById);

// Add new manager
router.post('/', ManagerController.save);

// Update manager
router.put('/:id', ManagerController.save);

// Delete manager
router.delete('/:id', ManagerController.deleteById);

module.exports = router;
