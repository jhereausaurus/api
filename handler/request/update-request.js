module.exports.handler = async (request, reply) => {
  try {
    const { requestService, payload } = request;
    const requestId = request.params.requestId;

    const checkIfRequestExist = await requestService.getRequestId(requestId);

    if (!checkIfRequestExist)
      throw { message: 'Not Found', details: 'Request not found', code: 404 };

    const result = await requestService.updateRequest(requestId, payload);

    if (!result)
      throw {
        message: 'Operation Failed',
        details: 'Request is not updated',
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
