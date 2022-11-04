require('dotenv').config({ debug: true });

const Hapi = require('@hapi/hapi');

const userPlugin = require('./plugins/user');
const rolePlugin = require('./plugins/role');
const announcementPlugin = require('./plugins/announcement');
const eventPlugin = require('./plugins/event');
const inventoryPlugin = require('./plugins/inventory');
const reportPlugin = require('./plugins/report');
const requestPlugin = require('./plugins/request');
const reservationPlugin = require('./plugins/reservation');

const init = async () => {
  const server = Hapi.server({
    host: '0.0.0.0',
    port: process.env.PORT || 5000,
  });

  await server.register([
    userPlugin,
    rolePlugin,
    announcementPlugin,
    eventPlugin,
    inventoryPlugin,
    reportPlugin,
    requestPlugin,
    reservationPlugin,
  ]);

  await server.start();
};

init();
