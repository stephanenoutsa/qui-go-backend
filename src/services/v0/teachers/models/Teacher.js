const Sequelize = require('sequelize');

const sequelize = require('../../../../utils/sequelize');

const Teacher = sequelize.define('teacher', {
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
});

module.exports = Teacher;
