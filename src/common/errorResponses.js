const errorResponses = {
  Unauthenticated: {
    code: 403,
    message: 'User authentication failed'
  },
  NotFound: {
    code: 404,
    message: 'Not found'
  }
};
module.exports = errorResponses;
