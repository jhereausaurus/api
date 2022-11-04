const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define(
    'reports',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: DataTypes.STRING,
      type: DataTypes.STRING,
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

  Reports.associate = (model) => {
    Reports.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  };

  return Reports;
};
