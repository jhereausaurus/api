module.exports.handler = async (request, reply) => {
  try {
    const { reservationService, payload } = request;
    const reservationId = request.params.reservationId;

    const checkIfReservationExist = await reservationService.getReservationId(
      reservationId
    );

    if (!checkIfReservationExist)
      throw {
        message: 'Not Found',
        details: 'Reservation not found',
        code: 404,
      };

    const result = await reservationService.updateReservation(
      reservationId,
      payload
    );

    if (!result)
      throw {
        message: 'Operation Failed',
        details: 'Reservation is not updated',
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
