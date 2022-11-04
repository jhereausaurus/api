const { Announcement, User } = require('../models/model-schema');

// const createAnnouncement = async (payload) => {
//   return await Announcement.create(payload);
// };

const createAnnouncement = async (id, payload) => {
  return await Announcement.create(payload, {
    where: {
      user_id: id,
    },
  });
};

const deleteAnnouncement = async (id) => {
  return await Announcement.destroy({
    where: {
      id: id,
    },
  });
};

const getAllAnnouncement = async () => {
  return await Announcement.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'content',
      'cover_url',
      'createdAt',
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

const getSpecificAnnouncement = async (id) => {
  return await Announcement.findOne({
    attributes: [
      'id',
      'title',
      'description',
      'content',
      'cover_url',
      'createdAt',
    ],
    where: {
      id: id,
    },
    include: [
      {
        attributes: ['username'],
        model: User,
        as: 'user',
      },
    ],
  });
};

const getAnnouncementId = async (id) => {
  return await Announcement.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
};

const updateAnnouncement = async (id, payload) => {
  return await Announcement.update(payload, {
    where: {
      id: id,
    },
  });
};

module.exports = {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncement,
  getAnnouncementId,
  updateAnnouncement,
  getSpecificAnnouncement,
};
