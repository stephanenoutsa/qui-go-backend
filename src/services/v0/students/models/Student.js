const Sequelize = require('sequelize');

const sequelize = require('../../../../utils/sequelize');

const Student = sequelize.define('student', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  firstName: {
    type: Sequelize.STRING,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  grade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Student;
