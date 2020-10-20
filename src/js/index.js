import axios from 'axios';
import facultyCard from './Components/facultyCard';

const searchBtn = document.getElementById('search-btn');
const inputBox = document.getElementById('faculty-query');
const result = document.getElementById('result');
const api = '/.netlify/functions';

searchBtn.addEventListener('click', () => {
  let query = inputBox.value;
  if (!query) {
    setMessage('Query Cannot Be Empty');
    return;
  }
  setSpinner();
  axios
    .get(`${api}/faculty`, { params: { data: query } })
    .then((res) => {
      generateCard(res.data);
    })
    .catch((err) => {
      setMessage('Some Error Occurred');
    });
});

const generateCard = (data) => {
  if (data.length === 0) {
    setMessage('No Data Found');
  } else {
    let cards = '';
    data.forEach((faculty) => {
      const { Name, Title, Department, Image, Email, CV } = faculty;
      cards += facultyCard(Name, Title, Department, Image, Email, CV);
    });

    result.innerHTML = cards;
  }
};

const setMessage = (msg) => {
  result.innerHTML = `
  <div class="error">
    <span>${msg}</span>
  </div>
  `;
};

const setSpinner = () => {
  result.innerHTML = `
  <div class="loading">
    Loading
  </div>
  `;
};
