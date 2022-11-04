const md5 = require('md5');
const { User, Role } = require('../models/model-schema');

/** CHECK-USERNAME-IF-EXISTING*/
const getIdByUsername = async (username) => {
  return await User.findOne({
    attributes: ['username'],
    where: {
      username: username,
    },
  });
};

/** Create User */
const createUser = async (payload) => {
  return await User.create(payload);
};

/** Delete User */
const deleteUser = async (id) => {
  return await User.destroy({
    where: {
      id: id,
    },
  });
};

/** Find user by Id */
const findProfileByID = async (id) => {
  return await User.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
};

/** Update User */
const updateProfile = async (id, payload) => {
  return await User.update(payload, {
    where: {
      id: id,
    },
  });
};

/** Get All User */
const getAllUsers = async () => {
  return await User.findAll({
    attributes: [
      'id',
      'first_name',
      'last_name',
      'gender',
      'phone_number',
      'email',
      'username',
      'password',
      'address',
      'country',
      'city',
      'region',
      'zip_code',
    ],
    include: [
      {
        attributes: ['role_name'],
        model: Role,
        as: 'role',
      },
    ],
  });
};

/** Get Specific User */
const getUserProfile = async (id) => {
  return await User.findOne({
    required: true,
    attributes: [
      'id',
      'first_name',
      'last_name',
      'gender',
      'phone_number',
      'email',
      'username',
      'password',
      'address',
      'country',
      'city',
      'region',
      'zip_code',
    ],
    where: {
      id: id,
    },
    include: [
      {
        attributes: ['role_name'],
        model: Role,
        as: 'role',
      },
    ],
  });
};

/** Login */
const getUserByEmailAndPassword = async (payload) => {
  return await User.findOne({
    attributes: ['id'],
    where: {
      email: payload.email,
      // password: md5(payload.password),
      password: payload.password,
    },
  });
};

module.exports = {
  getIdByUsername,
  createUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  findProfileByID,
  getUserByEmailAndPassword,
  updateProfile,
};
