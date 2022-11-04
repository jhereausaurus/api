/** Handlers */
const createAnnouncement =
  require('../handler/announcement/create-announcement').handler;
const deleteAnnouncement =
  require('../handler/announcement/delete-announcement').handler;
const getAnnouncement =
  require('../handler/announcement/get-announcement').handler;
const getSpecificAnnouncement =
  require('../handler/announcement/get-specific-announcement').handler;
const updateAnnouncement =
  require('../handler/announcement/update-announcement').handler;

/** Middleware */
const validateApiKey = require('../middleware/api/validate-api-key');
const validateUserToken = require('../middleware/token/validate-user-token');

const announcementService = require('../services/announcement');

module.exports = {
  name: 'announcement-plugin',
  register: async (server) => {
    server.decorate('request', 'announcementService', announcementService);

    /** Create announcement */
    server.route({
      method: 'POST',
      path: '/api/announcements/create-announcement/{userId}',
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
        handler: createAnnouncement,
      },
    });

    /** Get announcement */
    server.route({
      method: 'GET',
      path: '/api/announcements',
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
        handler: getAnnouncement,
      },
    });

    server.route({
      method: 'GET',
      path: '/api/announcements/{id}',
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
        handler: getSpecificAnnouncement,
      },
    });

    /** Update announcement */
    server.route({
      method: 'PUT',
      path: '/api/announcements/update/{announcementId}',
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
        handler: updateAnnouncement,
      },
    });

    /** Delete announcement */
    server.route({
      method: 'DELETE',
      path: '/api/announcements/delete/{announcementId}',
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
        handler: deleteAnnouncement,
      },
    });
  },
};
