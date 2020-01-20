const Classroom = require('../models/Classroom');

// Get all classrooms
exports.findAll = async(req, res) => {
  try {
    const classrooms = await Classroom.findAll();

    return res.send({classrooms});
  } catch (e) {
    console.log(e);

    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Get classroom by ID
exports.findById = async(req, res) => {
  const {id} = req.params;

  try {
    const classroom = await Classroom.findByPk(id);

    return res.send({classroom});
  } catch (e) {
    console.log(e);

    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Create or update classroom
exports.save = async(req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  let {studentNumber, maxSize} = req.body;

  // check name is present
  if (!name) {
    return res.status(400).send({message: 'Name is required'});
  }

  // check studentNumber is present
  if (!studentNumber) {
    return res.status(400).send({message: 'Student number is required'});
  }

  studentNumber = parseInt(studentNumber);

  // check studentNumber is valid
  if (studentNumber > 24) {
    return res.status(400).send({message: 'Student number size cannot be greater than 24'});
  }

  maxSize = maxSize ? parseInt(maxSize) : null;

  // check maxSize is valid
  if (maxSize && maxSize > 24) {
    return res.status(400).send({message: 'Max size cannot be greater than 24'});
  }

  // Populate classroom model
  const classroom = {
    name,
    studentNumber,
    maxSize,
  };

  try {
    let newClassroom = {};

    if (id) {
      // Retrieve classroom
      newClassroom = await Classroom.findByPk(id);

      if (!newClassroom) {
        return res.status(404).send('Resource not found.');
      }

      newClassroom.name = name;
      newClassroom.studentNumber = studentNumber;
      newClassroom.maxSize = maxSize;

      // Update classroom
      await newClassroom.save();
    } else {
      // Create classroom
      newClassroom = await Classroom.create(classroom);
    }

    return res.send({classroom: newClassroom});
  } catch (e) {
    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Delete classroom by ID
exports.deleteById = async(req, res) => {
  const {id} = req.params;

  try {
    await Classroom.destroy({where: {id}});

    return res.send('Delete successful!');
  } catch (e) {
    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};
