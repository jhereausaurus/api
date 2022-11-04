module.exports.handler = async (request, reply) => {
  try {
    const { userService, payload, md5 } = request;
    const userId = request.params.userId;

    const checkIfUserExist = await userService.findProfileByID(userId);

    if (!checkIfUserExist)
      throw { message: 'Not Found', details: 'User id not found', code: 404 };

    if (payload.password) payload.password = md5(payload.password);

    const result = await userService.updateProfile(userId, payload);

    if (!result)
      throw {
        message: 'Operation Failed',
        details: 'Profile is not updated',
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
