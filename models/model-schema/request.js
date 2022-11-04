const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define(
    'requests',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: DataTypes.STRING,
      inventory_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
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

  Requests.associate = (model) => {
    Requests.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'user_id',
    });

    Requests.belongsTo(model.Inventory, {
      as: 'inventory',
      foreignKey: 'inventory_id',
    });
  };

  return Requests;
};
