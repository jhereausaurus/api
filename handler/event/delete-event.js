module.exports.handler = async (request, reply) => {
  try {
    const { eventService } = request;
    const eventId = request.params.eventId;

    const result = await eventService.deleteEvent(eventId);
    if (!result)
      throw { message: 'Not Found', details: 'Event not found', code: 404 };
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
