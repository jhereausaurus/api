module.exports.handler = async (request, reply) => {
  try {
    const { userService, payload, md5 } = request;
    payload.role_id = 1;

    const checkIfUserAlreadyExist = await userService.getIdByUsername(
      payload.username
    );

    if (checkIfUserAlreadyExist)
      throw {
        message: 'Operation Failed',
        details: 'User already exist',
        code: 400,
      };

    if (payload.password) payload.password = md5(payload.password);

    const result = await userService.createUser(payload);

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
