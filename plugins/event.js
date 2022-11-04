/** Handlers */
const createEvent = require('../handler/event/create-event').handler;
const deleteEvent = require('../handler/event/delete-event').handler;
const getEvent = require('../handler/event/get-event').handler;
const updateEvent = require('../handler/event/update-event').handler;

/** Middleware */
const validateApiKey = require('../middleware/api/validate-api-key');
const validateUserToken = require('../middleware/token/validate-user-token');

const eventService = require('../services/event');

module.exports = {
  name: 'event-plugin',
  register: async (server) => {
    server.decorate('request', 'eventService', eventService);

    /** Create event */
    server.route({
      method: 'POST',
      path: '/api/events/create-event',
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
        handler: createEvent,
      },
    });

    /** Get event */
    server.route({
      method: 'GET',
      path: '/api/events',
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
        handler: getEvent,
      },
    });

    /** Update event */
    server.route({
      method: 'PUT',
      path: '/api/events/update/{eventId}',
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
        handler: updateEvent,
      },
    });

    /** Delete event */
    server.route({
      method: 'DELETE',
      path: '/api/events/delete/{eventId}',
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
        handler: deleteEvent,
      },
    });
  },
};
