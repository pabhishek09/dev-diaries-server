const axios = require('axios');

const apiWrapper = options => {
  return new Promise(async (resolve, reject) => {
    try {
      const { headers, url, data, method } = options;
      const requestOptions = {
        headers,
        url,
        data,
        method,
        responseType: 'json'
      };
      const response = await axios(requestOptions);
      console.log('successful call');
      resolve(response);
    } catch (error) {
      console.log('API failed:', options.url);
      reject(error.response);
    }
  });
};
module.exports = apiWrapper;
