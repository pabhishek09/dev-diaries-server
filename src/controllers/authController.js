const qs = require('querystring');
const requestWrapper = require('../common/requestWrapper');
const errorResponses = require('../common/errorResponses');
const userService = require('../services/user.service');
// config to define app settings
const config = process.env;
const authHandler = async (req, res, next) => {
  try {
    const { code } = req ? req.query : null;
    const { client_id, client_secret, redirect_uri, token_url } = config;
    // configure request params
    const options = {
      method: 'GET',
      url: `${token_url}?${qs.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri
        // state: req && req.session ? req.session.csrf_string : null
      })}`,
      // headers: {
      //   accept: 'application/json'
      // }
    };
    console.log('request', options);

    const { data } = await requestWrapper(options);
    console.log('authresponse', data, typeof data);

    if (data) {
      const access_token = /access_token=([^&#]*)/.exec(data)[1];
      console.log('***', access_token);
      try {
        const options_user = {
          method: 'GET',
          url: `${config.user_url}?access_token=${access_token}`,
          headers: {
            accept: 'application/json',
            'User-Agent': 'custom'
          }
        };
        const userResponse = await requestWrapper(options_user);
        const { createUser, findUser } = userService.default;
        const userDataFromDB = await findUser(userResponse.data.id);
        const isUserinDB = userDataFromDB.length > 0;
        if (!isUserinDB) {
          console.log('User is not present', userResponse.data);
          const createUserRes = await createUser(userResponse.data);
          res.json({ user: userResponse.data });
          console.log('user successfully created', createUserRes);
        } else {
          console.log('User already exists', userDataFromDB);
          res.json({ user: userDataFromDB });
        }
      } catch (err) {
        next(err);
      }
    }
    // make a request for auth_token using above options
  } catch (error) {
    // console.log('Internal Error', error);
    // next(error);
    res.status(403).json(errorResponses.Unauthenticated);
  }
};

export default authHandler;
