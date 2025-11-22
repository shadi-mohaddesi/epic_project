let banner = document.querySelector(".banner");

let loadbanner = async () => {
  try {
    let res = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    let data = await res.json();

    let result = data.banner
      .map((i) => {
        return `
        <img src="${i.url}" alt="${i.alt}">

        <div class="text">
          <h4>${i.title}</h4>
          <p>${i.paragraph}</p>
          <span>${i.price}</span>
          <button class="primary_btn">${i.blueBtn}</button>
          <button class="secondary_btn">${i.grayBtn}</button>
        </div>
    `;
      })
      .join("");

    banner.insertAdjacentHTML("beforeend", result);
  } catch (error) {
    console.log(error.message);
  }
};

export default loadbanner