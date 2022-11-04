module.exports.handler = async (request, reply) => {
  try {
    const { eventService, payload } = request;
    const eventId = request.params.eventId;

    const checkIfEventExist = await eventService.getEventId(eventId);

    if (!checkIfEventExist)
      throw { message: 'Not Found', details: 'Event not found', code: 404 };

    const result = await eventService.updateEvent(eventId, payload);

    if (!result)
      throw {
        message: 'Operation Failed',
        details: 'Event is not updated',
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
