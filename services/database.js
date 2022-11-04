const { Sequelize } = require('sequelize');
const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USERNAME } = process.env;
let sequelize;

const loadDatabase = () => {
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
  });

  return sequelize;
};

const initDb = () => {
  if (!sequelize) {
    sequelize = loadDatabase();
  } else {
    delete sequelize.connectionManager.getConnection;
  }
  return sequelize;
};

module.exports = {
  initDb,
};
