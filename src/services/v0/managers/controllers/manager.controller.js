// Third party modules
const bcrypt = require('bcryptjs');

const Manager = require('../models/Manager');

// Get all managers
exports.findAll = async(req, res) => {
  try {
    const managers = await Manager.findAll();

    return res.send({managers});
  } catch (e) {
    console.log(e);

    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Get manager by ID
exports.findById = async(req, res) => {
  const {id} = req.params;

  try {
    const manager = await Manager.findByPk(id);

    return res.send({manager});
  } catch (e) {
    console.log(e);

    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Create or update manager
exports.save = async(req, res) => {
  const {id} = req.params;
  const {firstName, lastName, username} = req.body;

  // check lastName is present
  if (!lastName) {
    return res.status(400).send({message: 'Last name is required'});
  }

  // check username is present
  if (!username) {
    return res.status(400).send({message: 'Username is required'});
  }

  try {
    if (!id) {
      // check username is valid
      const m = await Manager.findOne({where: {username}});

      if (m) {
        return res.status(400).send({message: 'Username is already taken'});
      }
    }

    // Generate password
    let password = Math.random().toString(36).substring(7);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Populate manager model
    const manager = {
      firstName,
      lastName,
      username,
      password: hash,
    };

    let newManager = {};

    if (id) {
      // Retrieve manager
      newManager = await Manager.findByPk(id);

      if (!newManager) {
        return res.status(404).send('Resource not found.');
      }

      newManager.firstName = firstName;
      newManager.lastName = lastName;
      newManager.username = username;
      // newManager.password = hash;

      // Update manager
      await newManager.save();
    } else {
      // Create manager
      newManager = await Manager.create(manager);
    }

    return res.send({manager: newManager});
  } catch (e) {
    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};

// Delete manager by ID
exports.deleteById = async(req, res) => {
  const {id} = req.params;

  try {
    await Manager.destroy({where: {id}});

    return res.send('Delete successful!');
  } catch (e) {
    return res.status(500).send('An error occurred while processing your request. Please try again later.');
  }
};
