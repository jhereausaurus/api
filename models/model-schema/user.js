const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      role_id: DataTypes.INTEGER,
      // announcement_id: DataTypes.INTEGER,
      // request_id: DataTypes.INTEGER,
      // reservation_id: DataTypes.INTEGER,
      // report_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone_number: DataTypes.BIGINT,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      region: DataTypes.STRING,
      zip_code: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Users.associate = (model) => {
    Users.belongsTo(model.Role, {
      as: 'role',
      foreignKey: 'role_id',
    });
    // Users.belongsTo(model.Announcement, {
    //   as: 'announcement',
    //   foreignKey: 'announcement_id',
    // });
    // Users.belongsTo(model.Request, {
    //   as: 'request',
    //   foreignKey: 'request_id',
    // });
    // Users.belongsTo(model.Reservation, {
    //   as: 'reservation',
    //   foreignKey: 'reservation_id',
    // });
    // Users.belongsTo(model.Report, {
    //   as: 'report',
    //   foreignKey: 'report_id',
    // });
  };

  return Users;
};
