const { Event } = require('../models/model-schema');

const createEvent = async (payload) => {
  return await Event.create(payload);
};

const deleteEvent = async (id) => {
  return await Event.destroy({
    where: {
      id: id,
    },
  });
};

const getAllEvents = async () => {
  return await Event.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'start_date',
      'start_time',
      'end_time',
      'end_date',
    ],
  });
};

const getEventId = async (id) => {
  return await Event.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
};

const updateEvent = async (id, payload) => {
  return await Event.update(payload, {
    where: {
      id: id,
    },
  });
};

module.exports = {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventId,
  updateEvent,
};
