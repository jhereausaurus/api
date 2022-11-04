/** Handlers */
const createReservation =
  require('../handler/reservation/create-reservation').handler;
const deleteReservation =
  require('../handler/reservation/delete-reservation').handler;
const getReservation =
  require('../handler/reservation/get-reservation').handler;
const updateReservation =
  require('../handler/reservation/update-reservation').handler;

/** Middleware */
const validateApiKey = require('../middleware/api/validate-api-key');
const validateUserToken = require('../middleware/token/validate-user-token');

const reservationService = require('../services/reservation');

module.exports = {
  name: 'reservation-plugin',
  register: async (server) => {
    server.decorate('request', 'reservationService', reservationService);

    /** Create reservation */
    server.route({
      method: 'POST',
      path: '/api/reservations/create-reservation/{userId}',
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
        handler: createReservation,
      },
    });

    /** Get reservation */
    server.route({
      method: 'GET',
      path: '/api/reservations',
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
        handler: getReservation,
      },
    });

    /** Update reservation */
    server.route({
      method: 'PUT',
      path: '/api/reservations/update/{reservationId}',
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
        handler: updateReservation,
      },
    });

    /** Delete reservation */
    server.route({
      method: 'DELETE',
      path: '/api/reservations/delete/{reservationId}',
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
        handler: deleteReservation,
      },
    });
  },
};
