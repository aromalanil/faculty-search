const facultyCard = (Name, Title, Department, Image, Email, CV) => {
  return `

  <div class="faculty">
        <img src="${Image}" alt="" />
        <h3>${Name}</h3>
        <p>${Title}</p>
        <a href="mailto:${Email}">Email</a>
        <a href="${CV}">CV</a>
  </div>

  `.trim();
};

export default facultyCard;
