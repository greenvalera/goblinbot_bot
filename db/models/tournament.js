'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournament', {
    date: DataTypes.DATE,
    type: Sequelize.ENUM('draft', 'standart', 'FNM', 'showdown'),
  }, {});
  Tournament.associate = function(models) {
    // associations can be defined here
  };
  return Tournament;
};