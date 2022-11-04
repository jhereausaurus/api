/** Handlers */
const createRequest = require('../handler/request/create-request').handler;
const deleteRequest = require('../handler/request/delete-request').handler;
const getRequest = require('../handler/request/get-request').handler;
const updateRequest = require('../handler/request/update-request').handler;

/** Middleware */
const validateApiKey = require('../middleware/api/validate-api-key');
const validateUserToken = require('../middleware/token/validate-user-token');

const requestService = require('../services/request');

module.exports = {
  name: 'request-plugin',
  register: async (server) => {
    server.decorate('request', 'requestService', requestService);

    /** Create request */
    server.route({
      method: 'POST',
      path: '/api/requests/create-request/{userId}',
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
        handler: createRequest,
      },
    });

    /** Get request */
    server.route({
      method: 'GET',
      path: '/api/requests',
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
        handler: getRequest,
      },
    });

    /** Update request */
    server.route({
      method: 'PUT',
      path: '/api/requests/update/{requestId}',
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
        handler: updateRequest,
      },
    });

    /** Delete request */
    server.route({
      method: 'DELETE',
      path: '/api/requests/delete/{requestId}',
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
        handler: deleteRequest,
      },
    });
  },
};
