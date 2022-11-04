module.exports.handler = async (request, reply) => {
  try {
    const { announcementService } = request;
    const announcementId = request.params.announcementId;

    const result = await announcementService.deleteAnnouncement(announcementId);
    if (!result)
      throw {
        message: 'Not Found',
        details: 'Announcement not found',
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
