const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Announcements = sequelize.define(
    'announcements',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.STRING,
      cover_url: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Announcements.associate = (model) => {
    Announcements.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  };

  return Announcements;
};
