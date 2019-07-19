import userService from '../services/user.service';

const qs = require('querystring');
const requestWrapper = require('../common/requestWrapper');
const errorResponses = require('../common/errorResponses');
// config to define app settings
const config = process.env;
const authHandler = async (req, res, next) => {
  console.log('entred auth handler', req.query);
  try {
    const { code } = req ? req.query : null;
    const { client_id, client_secret, redirect_uri, token_url } = config;
    // configure request params
    const options = {
      method: 'POST',
      url: `${token_url}?${qs.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri
        // state: req && req.session ? req.session.csrf_string : null
      })}`,
      headers: {
        accept: 'application/json'
      }
    };
    console.log('request', options);

    const { data } = await requestWrapper(options);
    console.log('authresponse', data);
    if (data) {
      try {
        const options_user = {
          method: 'GET',
          url: `${config.user_url}?access_token=${data.access_token}`,
          headers: {
            accept: 'application/json',
            'User-Agent': 'custom'
          }
        };
        const userResponse = await requestWrapper(options_user);
        const { createUser, findUser } = userService;
        const userDataFromDB = await findUser(userResponse.data.id);
        const isUserinDB = userDataFromDB.length > 0;
        if (!isUserinDB) {
          res.json({ user: userResponse.data });

          const createUserRes = await createUser(userResponse.data);

          console.log('user successfully created', createUserRes);
        } else {
          res.json({ user: userDataFromDB });
        }
      } catch (err) {
        next(err);
      }
    }
    // make a request for auth_token using above options
  } catch (error) {
    console.log('Internal Error in auth controller', error);
    next(error);
    res.status(403).json(errorResponses.Unauthenticated);
  }
};

export default authHandler;
