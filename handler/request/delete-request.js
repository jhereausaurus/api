module.exports.handler = async (request, reply) => {
  try {
    const { requestService } = request;
    const requestId = request.params.requestId;

    const result = await requestService.deleteRequest(requestId);
    if (!result)
      throw { message: 'Not Found', details: 'Request not found', code: 404 };
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
