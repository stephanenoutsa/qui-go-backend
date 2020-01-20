const Sequelize = require('sequelize');

const sequelize = require('../../../../utils/sequelize');

const Classroom = sequelize.define('classroom', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  studentNumber: {
    type: Sequelize.INTEGER,
  },

  maxSize: {
    type: Sequelize.INTEGER,
    defaultValue: 24,
  },
});

module.exports = Classroom;
