module.exports.handler = async (request, reply) => {
  try {
    const { reservationService } = request;
    const reservationId = request.params.reservationId;

    const result = await reservationService.deleteReservation(reservationId);
    if (!result)
      throw {
        message: 'Not Found',
        details: 'Reservation not found',
        code: 404,
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
