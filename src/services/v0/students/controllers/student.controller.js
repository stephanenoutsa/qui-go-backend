const Student = require('../models/Student');
const Classroom = require('../../classrooms/models/Classroom.js');

// Get all students
exports.findAll = async(req, res) => {
  try {
    const students = await Student.findAll({include: Classroom});

    return res.send({students});
  } catch (e) {
    console.log(e);

    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Get student by ID
exports.findById = async(req, res) => {
  const {id} = req.params;

  try {
    const student = await Student.findByPk(id, {include: Classroom});

    return res.send({student});
  } catch (e) {
    console.log(e);

    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Create or update student
exports.save = async(req, res) => {
  const {id} = req.params;
  const {firstName, lastName, grade} = req.body;
  let {classroomId} = req.body;

  // check lastName is present
  if (!lastName) {
    return res.status(400).send({message: 'Last name is required'});
  }

  // check grade is present
  if (!grade) {
    return res.status(400).send({message: 'Grade is required'});
  }

  // check classroomId is present
  if (!classroomId) {
    return res.status(400).send({message: 'classroom is required'});
  }

  classroomId = parseInt(classroomId);

  try {
    let newStudent = {};

    if (id) {
      // Retrieve teacher
      newStudent = await Student.findByPk(id);

      if (!newStudent) {
        return res.status(404).send('Resource not found.');
      }

      newStudent.firstName = firstName;
      newStudent.lastName = lastName;
      newStudent.grade = grade;
      newStudent.classroomId = classroomId;

      // Update student
      await newStudent.save();
    } else {
      // Populate student model
      const student = {
        firstName,
        lastName,
        grade,
        classroomId,
      };

      // Create student
      newStudent = await Student.create(student);
    }

    return res.send({student: newStudent});
  } catch (e) {
    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Delete student by ID
exports.deleteById = async(req, res) => {
  const {id} = req.params;

  try {
    await Student.destroy({where: {id}});

    return res.send('Delete successful!');
  } catch (e) {
    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};
