const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define(
    'inventory',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      item_name: DataTypes.STRING,
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Inventory;
};
