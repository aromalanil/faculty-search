const getFacultyData = require('./lib/getFacultyData');

exports.handler = async (event, callback) => {
  const query = event.queryStringParameters.data;
  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify(new Error('Invalid data param')),
    };
  }
  const facultyData = await getFacultyData();
  const filteredData = facultyData.filter((faculty) => {
    return faculty.Name.toLowerCase()
      .split(' ')
      .join('')
      .includes(query.toLowerCase().split(' ').join(''));
  });
  return {
    statusCode: 200,
    body: JSON.stringify(filteredData),
  };
};
