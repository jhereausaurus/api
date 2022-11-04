const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    'roles',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      role_name: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return Roles;
};
