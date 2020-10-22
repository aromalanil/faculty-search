const imageToBase64 = require('image-to-base64');

exports.handler = async (event, callback) => {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 404,
      body: JSON.stringify(new Error('Image Not Found')),
    };
  } else {
    return {
      statusCode: 200,
      header: { 'Content-Type': 'image/png' },
      body: await imageToBase64(`http://cectl.ac.in${url}`),
      isBase64Encoded: true,
    };
  }
};
