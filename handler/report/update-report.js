module.exports.handler = async (request, reply) => {
  try {
    const { reportService, payload } = request;
    const reportId = request.params.reportId;

    const chcekIfReportExist = await reportService.getReportId(reportId);

    if (!chcekIfReportExist)
      throw { message: 'Not Found', details: 'Report not found', code: 404 };

    const result = await reportService.updateReport(reportId, payload);

    if (!result)
      throw {
        message: 'Operation Failed',
        details: 'Report is not updated',
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
