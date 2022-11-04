/** Role Handlers */
const createRole = require('../handler/role/create-role').handler;
const getRole = require('../handler/role/get-role').handler;
const updateRole = require('../handler/role/update-role').handler;
const deleteRole = require('../handler/role/delete-role').handler;

/** Middleware */
const validateApiKey = require('../middleware/api/validate-api-key');
const validateUserToken = require('../middleware/token/validate-user-token');

const roleService = require('../services/role');

module.exports = {
  name: 'role-plugin',
  register: async (server) => {
    server.decorate('request', 'roleService', roleService);

    /** Create role */
    server.route({
      method: 'POST',
      path: '/api/roles/create-role',
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
        handler: createRole,
      },
    });

    /** Get roles */
    server.route({
      method: 'GET',
      path: '/api/roles',
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
        handler: getRole,
      },
    });

    /** Update role */
    server.route({
      method: 'PUT',
      path: '/api/roles/update/{roleId}',
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
        handler: updateRole,
      },
    });

    /** Delete role */
    server.route({
      method: 'DELETE',
      path: '/api/roles/delete/{roleId}',
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
        handler: deleteRole,
      },
    });
  },
};
