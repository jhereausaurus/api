module.exports.handler = async (request, reply) => {
  try {
    const { inventoryService } = request;
    const inventoryId = request.params.inventoryId;

    const result = await inventoryService.deleteItem(inventoryId);
    if (!result)
      throw { message: 'Not Found', details: 'Item not found', code: 404 };
    return reply.response().code(204);
  } catch (err) {
    let response = reply.response({
      message: 'Internal Server Error',
      details: '',
    });
    if (err.code) {
      response = reply
        .response({ message: err.message, details: err.details })
        .code(err.code);
    }
    return response;
  }
};
