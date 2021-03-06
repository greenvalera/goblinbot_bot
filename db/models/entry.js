'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.import('./event');
  const entry = sequelize.define('entry', {
    name: DataTypes.STRING,
    eventID: {
      type: DataTypes.INTEGER,
      references: {
        model: Event,
        key: 'id'
      }
    }
  }, {});

  entry.associate = function(models) {
    models.entry.belongsTo(models.event);
  };

  return entry;
};