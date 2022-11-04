module.exports.handler = async (request, reply) => {
  try {
    const { reportService } = request;
    const reportId = request.params.reportId;

    const result = await reportService.deleteReport(reportId);
    if (!result)
      throw { message: 'Not Found', details: 'Report not found', code: 404 };
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
