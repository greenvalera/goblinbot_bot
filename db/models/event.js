'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    date: DataTypes.DATE,
    type: DataTypes.ENUM('draft', 'standart', 'FNM', 'showdown'),
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};