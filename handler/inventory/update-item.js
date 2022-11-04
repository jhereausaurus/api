module.exports.handler = async (request, reply) => {
  try {
    const { inventoryService, payload } = request;
    const inventoryId = request.params.inventoryId;

    const checkIfItemExist = await inventoryService.getItemId(inventoryId);

    if (!checkIfItemExist)
      throw { message: 'Not Found', details: 'Item not found', code: 404 };

    const itemsQuantity = await inventoryService.getItemQuantity(inventoryId);

    if (!itemsQuantity)
      throw { message: 'Not Found', details: 'Item not found', code: 404 };

    const requestQuantity = payload.quantity;

    if (!requestQuantity)
      throw {
        message: 'Not Found',
        details: 'Request quantity not found',
        code: 404,
      };

    if (itemsQuantity < requestQuantity)
      throw {
        message: 'Bad Request',
        details: 'Insuuffficient item quantity',
        code: 400,
      };

    const finalQuantity = itemsQuantity.quantity - requestQuantity;

    const result = await inventoryService.updateItem(
      inventoryId,
      finalQuantity
    );

    if (!result)
      throw {
        message: 'Operation Failed',
        details: 'Item is not updated',
        code: 400,
      };

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
