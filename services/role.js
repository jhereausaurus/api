const { Role } = require('../models/model-schema');

/** Create Roles */
const createRole = async (payload) => {
  return await Role.create(payload);
};

/** Get All Roles */
const getRoles = async () => {
  return await Role.findAll({
    attributes: ['id', 'role_name'],
  });
};

/** Get Role ID */
const getRoleId = async (id) => {
  return await Role.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
};

/** Update Role */
const updateRole = async (id, payload) => {
  return Role.update(payload, {
    where: {
      id: id,
    },
  });
};

/** Delete Role */
const deleteRole = async (id) => {
  return await Role.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createRole,
  getRoles,
  getRoleId,
  updateRole,
  deleteRole,
};
