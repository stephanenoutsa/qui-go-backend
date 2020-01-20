// Third party modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const Manager = require('../../managers/models/Manager');

// Private variables
const config = require('../../../../config/config');
const c = process.env.production ? config.prod : config.dev;

// Compare submitted password with hashed password
const comparePasswords = async(password, hash) => {
  const result = await bcrypt.compare(password, hash);

  return result;
};

// Generate JWT
const generateJWT = (manager) => {
  return jwt.sign(manager.toJSON(), c.jwt.secret, {expiresIn: '1h'});
};

// Register manager
exports.register = async(req, res) => {
  const {firstName, lastName, username, password} = req.body;

  // check lastName is present
  if (!lastName) {
    return res.status(400).send({message: 'Last name is required'});
  }

  // check username is present
  if (!username) {
    return res.status(400).send({message: 'Username is required'});
  }

  // check password is present
  if (!password) {
    return res.status(400).send({message: 'Password is required'});
  }

  try {
    // check username is valid
    const m = await Manager.findOne({where: {username}});

    if (m) {
      return res.status(400).send({message: 'Username is already taken'});
    }

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

    // Create manager
    const newManager = await Manager.create(manager);

    // Generate JWT
    const jwt = generateJWT(newManager);

    // Return response
    return res.send({
      auth: true,
      token: jwt,
      manager: {
        name: `${newManager.firstName} ${newManager.lastName}`,
        username: newManager.username,
      },
    });
  } catch (e) {
    return res.status(500).send({message: e});
  }
};

// Login manager
exports.login = async(req, res) => {
  const {username, password} = req.body;

  // Validate username
  if (!username) {
    return res.status(400).send('Username is required');
  }

  // Validate password
  if (!password) {
    return res.status(400).send('Password is required');
  }

  const manager = await Manager.findOne({where: {username}});

  if (!manager) {
    return res.status(401).send('No account registered with that username');
  }

  // Compare submitted password and manager's password
  const match = await comparePasswords(password, manager.password);

  if (!match) {
    return res.status(401).send('Username/password invalid');
  }

  // Generate JWT
  const jwt = generateJWT(manager);

  // Return response
  return res.send({
    auth: true,
    token: jwt,
    manager: {
      name: `${manager.firstName} ${manager.lastName}`,
      username: manager.username,
    },
  });
};

// Protect routes with an auth requirement
exports.requireAuth = async(req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  const tokenBearer = req.headers.authorization.split(' ');

  if (tokenBearer.length !== 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }

  const token = tokenBearer[1];

  try {
    jwt.verify(token, c.jwt.secret);

    return next();
  } catch (e) {
    return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
  }
};
