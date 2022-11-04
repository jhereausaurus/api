module.exports.handler = async (request, reply) => {
  try {
    const { roleService, payload } = request;
    const roleId = request.params.roleId;

    const result = await roleService.updateRole(roleId, payload);

    if (!result)
      throw { message: 'Something went wrong', details: '', code: 500 };

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
