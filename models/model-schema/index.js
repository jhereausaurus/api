const { initDb } = require('../../services/database');
const Sequelize = require('sequelize');

const User = require('./user');
const Announcement = require('./announcement');
const Request = require('./request');
const Reservation = require('./reservation');
const Report = require('./report');
const Role = require('./role');
const Inventory = require('./inventory');
const Event = require('./event');

const db = {};
const sequelize = initDb();

db.User = User(sequelize, Sequelize);
db.Announcement = Announcement(sequelize, Sequelize);
db.Request = Request(sequelize, Sequelize);
db.Reservation = Reservation(sequelize, Sequelize);
db.Report = Report(sequelize, Sequelize);
db.Role = Role(sequelize, Sequelize);
db.Inventory = Inventory(sequelize, Sequelize);
db.Event = Event(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
