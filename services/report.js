const { Report, User } = require('../models/model-schema');
const createReport = async (id, payload) => {
  return await Report.create(payload, {
    where: {
      user_id: id,
    },
  });
};

const deleteReport = async (id) => {
  return await Report.destroy({
    where: {
      id: id,
    },
  });
};

const getAllReport = async () => {
  return await Report.findAll({
    attributes: ['id', 'type', 'description', 'status'],
    include: [
      {
        attributes: ['username'],
        model: User,
        as: 'user',
      },
    ],
  });
};

const getReportId = async (id) => {
  return await Report.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
};

const updateReport = async (id, payload) => {
  return await Report.update(payload, {
    where: {
      id: id,
    },
  });
};

module.exports = {
  createReport,
  deleteReport,
  getAllReport,
  getReportId,
  updateReport,
};
