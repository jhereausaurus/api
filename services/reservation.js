const { Reservation, User } = require('../models/model-schema');
const createReservation = async (payload) => {
  return await Reservation.create(payload);
};

const deleteReservation = async (id) => {
  return await Reservation.destroy({
    where: {
      id: id,
    },
  });
};

const getAllReservation = async () => {
  return await Reservation.findAll({
    attributes: [
      'id',
      'event_id',
      'event_type',
      'facility',
      'description',
      'status',
    ],
    include: [
      {
        attributes: ['username'],
        model: User,
        as: 'user',
      },
    ],
  });
};

const getReservationId = async (id) => {
  return await Reservation.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
};

const updateReservation = async (id, payload) => {
  return await Reservation.update(payload, {
    where: {
      id: id,
    },
  });
};

module.exports = {
  createReservation,
  deleteReservation,
  getAllReservation,
  getReservationId,
  updateReservation,
};
