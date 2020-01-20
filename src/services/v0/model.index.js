const Manager = require('./managers/models/Manager');
const Classroom = require('./classrooms/models/Classroom');
const Student = require('./students/models/Student');
const Teacher = require('./teachers/models/Teacher');
const TeacherClassroom = require('./teachers/models/TeacherClassroom');

// Define model relationships
Student.belongsTo(Classroom);
Classroom.hasMany(Student);

Teacher.belongsToMany(Classroom, {through: TeacherClassroom});
Classroom.belongsToMany(Teacher, {through: TeacherClassroom});

module.exports = [Manager, Classroom, Student, Teacher];
