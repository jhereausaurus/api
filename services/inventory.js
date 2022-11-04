const { Inventory } = require('../models/model-schema');

const createItem = async (payload) => {
  return await Inventory.create(payload);
};

const deleteItem = async (id) => {
  return await Inventory.destroy({
    where: {
      id: id,
    },
  });
};

const getAllItems = async () => {
  return await Inventory.findAll({
    attributes: ['id', 'item_name', 'quantity'],
  });
};

const getItemId = async (id) => {
  return await Inventory.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
};

const getItemQuantity = async (id) => {
  return await Inventory.findOne({
    attributes: ['quantity'],
    where: {
      id: id,
    },
  });
};

const updateItem = async (id, payload) => {
  return await Inventory.update(payload, {
    where: {
      id: id,
    },
  });
};

module.exports = {
  createItem,
  deleteItem,
  getAllItems,
  getItemId,
  updateItem,
  getItemQuantity,
};
