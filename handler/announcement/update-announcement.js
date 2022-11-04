module.exports.handler = async (request, reply) => {
  try {
    const { announcementService, payload } = request;
    const announcementId = request.params.announcementId;

    const checkIfAnnouncementExist =
      await announcementService.getAnnouncementId(announcementId);

    if (!checkIfAnnouncementExist) {
      throw {
        message: 'Not Found',
        details: 'Announcement not found',
        code: 404,
      };
    }

    const result = announcementService.updateAnnouncement(
      announcementId,
      payload
    );

    if (!result)
      throw {
        message: 'Operation Failed',
        details: 'Announcement is not updated',
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
