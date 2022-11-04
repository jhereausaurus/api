module.exports.handler = async (request, reply) => {
  try {
    const { reservationService, payload } = request;

    const userId = request.params.userId;

    payload.user_id = userId;

    const result = await reservationService.createReservation(payload);

    if (!result)
      throw { message: 'Something went wrong', details: '', code: 500 };

    return reply.response().code(201);
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
