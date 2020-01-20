const Sequelize = require('sequelize');

const sequelize = require('../../../../utils/sequelize');

const TeacherClassroom = sequelize.define('teacherClassroom', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = TeacherClassroom;
