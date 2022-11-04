const { Request, User } = require('../models/model-schema');
const createRequest = async (uid, payload) => {
  return await Request.create(payload, {
    where: {
      user_id: uid,
    },
  });
};

const deleteRequest = async (id) => {
  return await Request.destroy({
    where: {
      id: id,
    },
  });
};

const getAllRequest = async () => {
  return await Request.findAll({
    attributes: ['id', 'inventory_id', 'description', 'type', 'status'],
    include: [
      {
        attributes: ['username'],
        model: User,
        as: 'user',
      },
    ],
  });
};

const getRequestId = async (id) => {
  return await Request.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
};

const updateRequest = async (id, payload) => {
  return await Request.update(payload, {
    where: {
      id: id,
    },
  });
};

module.exports = {
  createRequest,
  deleteRequest,
  getAllRequest,
  getRequestId,
  updateRequest,
};
