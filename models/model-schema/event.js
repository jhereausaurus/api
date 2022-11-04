const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define(
    'events',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      start_date: DataTypes.DATE,
      start_time: DataTypes.TIME,
      end_time: DataTypes.DATE,
      end_date: DataTypes.TIME,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Events;
};
