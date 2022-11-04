/** User Handler */
const loginHandler = require('../handler/user/login').handler;
const createUser = require('../handler/user/create-user').handler;
const createAdmin = require('../handler/user/create-admin').handler;
const deleteUser = require('../handler/user/delete-user').handler;
const updateUser = require('../handler/user/update-user').handler;
const updateUserProfile =
  require('../handler/user/update-user-profile').handler;
const getAllUsers = require('../handler/user/get-all-user').handler;
const getUserProfile = require('../handler/user/get-user-profile').handler;

/* MiddleWare */
const validateApiKey = require('../middleware/api/validate-api-key');
const validateUserToken = require('../middleware/token/validate-user-token');
const moment = require('moment');
const userService = require('../services/user');
const token = require('../token/generate-token');
const base64encode = require('base-64');
const md5 = require('md5');

module.exports = {
  name: 'user-plugin',
  register: async (server) => {
    server.decorate('request', 'userService', userService);
    server.decorate('request', 'token', token);
    server.decorate('request', 'base64encode', base64encode);
    server.decorate('request', 'md5', md5);
    server.decorate('request', 'moment', moment);

    /** Login handler */
    server.route({
      method: 'POST',
      path: '/api/login',
      options: {
        pre: [
          {
            method: validateApiKey,
          },
        ],
        handler: loginHandler,
      },
    });

    /** Create Admin */
    server.route({
      method: 'POST',
      path: '/api/users/create-admin',
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
        handler: createAdmin,
      },
    });

    /** Create User */
    server.route({
      method: 'POST',
      path: '/api/users/create-user',
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
        handler: createUser,
      },
    });

    /** Delete User */
    server.route({
      method: 'DELETE',
      path: '/api/users/delete/{userId}',
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
        handler: deleteUser,
      },
    });

    /** Update User */
    server.route({
      method: 'PUT',
      path: '/api/users/update/{userId}',
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
        handler: updateUser,
      },
    });

    /** Update User Profile */
    server.route({
      method: 'PUT',
      path: '/api/profile/{userId}',
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
        handler: updateUserProfile,
      },
    });

    /** Get All Users */
    server.route({
      method: 'GET',
      path: '/api/users',
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
        handler: getAllUsers,
      },
    });

    /** Get Current User */
    server.route({
      method: 'GET',
      path: '/api/users/myProfile',
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
        handler: getUserProfile,
      },
    });
  },
};
