const facultyCard = (Name, Title, Department, Image, Email, CV) => {
  return `
  <div class="faculty">
    <div class="top"></div>
    <div class="bottom">
      <div class="img-wrapper">
        ${getImage(Image, Name)}
      </div>
      <span class="name">${Name}</span>
      <span class="title">${Title}</span>
      <span class="department">${Department}</span>

      <div class="links">
        ${getMail(Email)}
        ${getCV(CV)}
      </div>
    </div>
   </div>
  `;
};

const getImage = (img, Name) => {
  if (img) return `<img src="${img}" alt="${Name} Image"/>`;
  else
    return `<img src="https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif" alt="No image found"/>`;
};

const getMail = (mail) => {
  if (mail)
    return `
  <div class="link-wrapper">
    <a href="mailto:${mail}"><i class="far fa-envelope"></i></a>
  </div>`;
  else return ``;
};

const getCV = (cv) => {
  if (cv)
    return `
  <div class="link-wrapper">
     <a href="${cv}"><i class="far fa-file-alt"></i></a>
  </div>`;
  else return ``;
};

export default facultyCard;
