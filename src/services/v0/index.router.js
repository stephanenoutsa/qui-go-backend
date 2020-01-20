// Third party modules
const {Router} = require('express');

// Routes
const ManagerRouter = require('./managers/routes/manager.router');
const ClassroomRouter = require('./classrooms/routes/classroom.router');
const StudentRouter = require('./students/routes/student.router');
const TeacherRouter = require('./teachers/routes/teacher.router');
const AuthRouter = require('./auth/routes/auth.router');

// Auth guard
const {requireAuth} = require('./auth/controllers/auth.controller');

// Private variables
const router = Router();

// Manager routes
router.use('/managers', requireAuth, ManagerRouter);

// Classroom routes
router.use('/classrooms', requireAuth, ClassroomRouter);

// Student routes
router.use('/students', requireAuth, StudentRouter);

// Teacher routes
router.use('/teachers', requireAuth, TeacherRouter);

// Auth routes
router.use('/auth', AuthRouter);

// Index route
router.get('/', (req, res) => {
  res.send('V0');
});

module.exports = router;
