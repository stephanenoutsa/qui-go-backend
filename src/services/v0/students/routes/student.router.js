// Third party modules
const {Router} = require('express');

// Controllers
const StudentController = require('../controllers/student.controller');

// Private variables
const router = Router();

// Retrieve all students
router.get('/', StudentController.findAll);

// Retrieve single student by id
router.get('/:id', StudentController.findById);

// Add new student
router.post('/', StudentController.save);

// Update student
router.put('/:id', StudentController.save);

// Delete student
router.delete('/:id', StudentController.deleteById);

module.exports = router;
