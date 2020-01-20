// Third party modules
const {Router} = require('express');

// Controllers
const ClassController = require('../controllers/classroom.controller');

// Private variables
const router = Router();

// Retrieve all classrooms
router.get('/', ClassController.findAll);

// Retrieve single classroom by id
router.get('/:id', ClassController.findById);

// Add new classroom
router.post('/', ClassController.save);

// Update classroom
router.put('/:id', ClassController.save);

// Delete classroom
router.delete('/:id', ClassController.deleteById);

module.exports = router;
