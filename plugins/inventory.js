/** Handlers */
const createItem = require('../handler/inventory/create-item').handler;
const deleteItem = require('../handler/inventory/delete-item').handler;
const getItem = require('../handler/inventory/get-item').handler;
const updateItem = require('../handler/inventory/update-item').handler;

/** Middleware */
const validateApiKey = require('../middleware/api/validate-api-key');
const validateUserToken = require('../middleware/token/validate-user-token');

const inventoryService = require('../services/inventory');

module.exports = {
  name: 'inventory-plugin',
  register: async (server) => {
    server.decorate('request', 'inventoryService', inventoryService);

    /** Create item */
    server.route({
      method: 'POST',
      path: '/api/inventory/items/create-item',
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
        handler: createItem,
      },
    });

    /** Get item */
    server.route({
      method: 'GET',
      path: '/api/inventory/items',
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
        handler: getItem,
      },
    });

    /** Update item */
    server.route({
      method: 'PUT',
      path: '/api/inventory/update/{inventoryId}',
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
        handler: updateItem,
      },
    });

    /** Delete item */
    server.route({
      method: 'DELETE',
      path: '/api/inventory/delete/{inventoryId}',
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
        handler: deleteItem,
      },
    });
  },
};
