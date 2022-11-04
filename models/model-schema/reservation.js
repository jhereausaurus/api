const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    'reservation',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: DataTypes.STRING,
      // event_id: DataTypes.STRING,
      event_type: DataTypes.STRING,
      facility: DataTypes.STRING,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Reservation.associate = (model) => {
    Reservation.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'user_id',
    });

    // Reservation.belongsTo(model.Event, {
    //   as: 'event',
    //   foreignKey: 'event_id',
    // });
  };

  return Reservation;
};
