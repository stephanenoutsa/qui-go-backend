const Teacher = require('../models/Teacher.js');
const TeacherClassroom = require('../models/TeacherClassroom.js');
const Classroom = require('../../classrooms/models/Classroom.js');

// Get all teachers
exports.findAll = async(req, res) => {
  try {
    const teachers = await Teacher.findAll({include: Classroom});

    return res.send({teachers});
  } catch (e) {
    console.log(e);

    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Get teacher by ID
exports.findById = async(req, res) => {
  const {id} = req.params;

  try {
    const teacher = await Teacher.findByPk(id, {include: Classroom});

    return res.send({teacher});
  } catch (e) {
    console.log(e);

    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Create or update teacher
exports.save = async(req, res) => {
  const {id} = req.params;
  const {firstName, lastName, classrooms} = req.body;

  // check lastName is present
  if (!lastName) {
    return res.status(400).send({message: 'Last name is required'});
  }

  // check classrooms are present
  if (!classrooms.length) {
    return res.status(400).send({message: 'At least a classroom is required'});
  }

  try {
    let newTeacher = {};

    if (id) {
      // Retrieve teacher
      newTeacher = await Teacher.findByPk(id);

      if (!newTeacher) {
        return res.status(404).send('Resource not found.');
      }

      newTeacher.firstName = firstName;
      newTeacher.lastName = lastName;

      // Update teacher
      await newTeacher.save();

      if (classrooms.length) {
        for (const c of classrooms) {
          // Check if teacher belongs to classroom
          const cArray = await newTeacher.getClassrooms({where: {id: c}});

          if (!cArray.length) {
            const classroom = await Classroom.findByPk(c);

            await newTeacher.addClassroom(classroom);
          }
        }
      } else {
        // Delete teacher's classrooms
        await TeacherClassroom.destroy({where: {teacherId: id}});
      }
    } else {
      // Populate teacher model
      const teacher = {
        firstName,
        lastName,
      };

      // Create teacher
      newTeacher = await Teacher.create(teacher);

      for (const c of classrooms) {
        const classroom = await Classroom.findByPk(c);

        await newTeacher.addClassroom(classroom);
      }
    }

    return res.send({teacher: newTeacher});
  } catch (e) {
    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Delete teacher by ID
exports.deleteById = async(req, res) => {
  const {id} = req.params;

  try {
    await Teacher.destroy({where: {id}});

    return res.send('Delete successful!');
  } catch (e) {
    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};
