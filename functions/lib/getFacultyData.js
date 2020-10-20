const cheerio = require('cheerio');
const fetch = require('node-fetch');

const getTitle = (facultyDiv) => {
  let title = facultyDiv.find('em').text();
  if (title === '') {
    title = facultyDiv.clone().children().remove().end().text().trim();
  }
  return title;
};

const getEmail = (anchorList) => {
  if (anchorList.length > 0) {
    const email = anchorList.eq(0).text();
    if (email.toLowerCase() !== 'cv') return email;
    return null;
  }
  return null;
};

const getCV = (anchorList) => {
  let cv = null;
  if (anchorList.length > 0) {
    if (anchorList.eq(0).text().toLowerCase() === 'cv') cv = anchorList.eq(0).attr('href');
    else if (anchorList.eq(1).text().toLowerCase() === 'cv') cv = anchorList.eq(1).attr('href');
  }
  return cv ? `http://cectl.ac.in${cv}` : null;
};

const getImage = (facultyDiv) => {
  const imageSrc = facultyDiv.find('img').attr('src');
  if (imageSrc.includes('no_photo_avatar.png')) return null;
  return `/.netlify/functions/image?url=${imageSrc}`;
};

const getFaculty = (data, department) => {
  const facultyList = [];

  const $ = cheerio.load(data);

  $('.bog').each(function () {
    const facultyDiv = $(this);

    const name = facultyDiv.find('h2').text();
    const title = getTitle(facultyDiv);
    const image = getImage(facultyDiv);
    const email = getEmail(facultyDiv.find('a'));
    const cv = getCV(facultyDiv.find('a'));

    const faculty = {
      Name: name,
      Title: title,
      Department: department,
      Image: image,
      Email: email,
      CV: cv,
    };

    facultyList.push(faculty);
  });

  return facultyList;
};

const getFacultyData = async () => {
  const data = await Promise.all([
    fetch('http://www.cectl.ac.in/index.php/department/computer-engineering')
      .then((res) => res.text())
      .then((data) => getFaculty(data, 'Computer Engineering')),
    fetch('http://www.cectl.ac.in/index.php/department/electronics-engineering')
      .then((res) => res.text())
      .then((data) => getFaculty(data, 'Electronics Engineering')),
    fetch('http://www.cectl.ac.in/index.php/department/electrical-engineering')
      .then((res) => res.text())
      .then((data) => getFaculty(data, 'Electrical Engineering')),
    fetch('http://www.cectl.ac.in/index.php/department/general-engineering')
      .then((res) => res.text())
      .then((data) => getFaculty(data, 'General Engineering')),
    fetch('http://www.cectl.ac.in/index.php/department/applied-engineering')
      .then((res) => res.text())
      .then((data) => getFaculty(data, 'Applied Engineering')),
  ]);
  return data.flat();
};

module.exports = getFacultyData;
