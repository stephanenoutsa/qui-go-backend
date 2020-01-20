// Third party modules
const {Router} = require('express');

// Controllers
const TeacherController = require('../controllers/teacher.controller');

// Private variables
const router = Router();

// Retrieve all teachers
router.get('/', TeacherController.findAll);

// Retrieve single teacher by id
router.get('/:id', TeacherController.findById);

// Add new teacher
router.post('/', TeacherController.save);

// Update teacher
router.put('/:id', TeacherController.save);

// Delete teacher
router.delete('/:id', TeacherController.deleteById);

module.exports = router;
