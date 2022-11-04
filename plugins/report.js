/** Handlers */
const createReport = require('../handler/report/create-report').handler;
const deleteReport = require('../handler/report/delete-report').handler;
const getReport = require('../handler/report/get-report').handler;
const updateReport = require('../handler/report/update-report').handler;

/** Middleware */
const validateApiKey = require('../middleware/api/validate-api-key');
const validateUserToken = require('../middleware/token/validate-user-token');

const reportService = require('../services/report');

module.exports = {
  name: 'report-plugin',
  register: async (server) => {
    server.decorate('request', 'reportService', reportService);

    /** Create report */
    server.route({
      method: 'POST',
      path: '/api/reports/create-report/{userId}',
      options: {
        pre: [
          {
            method: validateApiKey,
          },
          {
            method: validateUserToken,
            assign: 'u',
          },
        ],
        handler: createReport,
      },
    });

    /** Get report */
    server.route({
      method: 'GET',
      path: '/api/reports',
      options: {
        pre: [
          {
            method: validateApiKey,
          },
          {
            method: validateUserToken,
            assign: 'u',
          },
        ],
        handler: getReport,
      },
    });

    /** Update report */
    server.route({
      method: 'PUT',
      path: '/api/reports/update/{reportId}',
      options: {
        pre: [
          {
            method: validateApiKey,
          },
          {
            method: validateUserToken,
            assign: 'u',
          },
        ],
        handler: updateReport,
      },
    });

    /** Delete report */
    server.route({
      method: 'DELETE',
      path: '/api/reports/delete/{reportId}',
      options: {
        pre: [
          {
            method: validateApiKey,
          },
          {
            method: validateUserToken,
            assign: 'u',
          },
        ],
        handler: deleteReport,
      },
    });
  },
};
