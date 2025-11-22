let threePic = document.querySelector(".threePic");

let loadThreePic = async () => {
  try {
    let data = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    let res = await data.json();

    let result=res.threePic
      .map((p) => {
        return `
        <div class="eachPic">
          <img src="${p.url}" alt="${p.alt}" />
          <div class="texts">
            <span class="title">${p.title}</span>
            <span class="paragraph">${p.paragraph}</span>
          </div>
          <div class="buttons">
            ${p.blueBtn ? `<button class="blueBtn">${p.blueBtn}</button>` : ""}
            ${p.oldPrice ? `<del>${p.oldPrice}</del>` : ""}
            ${p.newPrice ? `<span>${p.newPrice}</span>` : ""}
            ${p.grayBtn ? `<button class="grayBtn">${p.grayBtn}</button>` : ""}
          </div>
        </div>
      `;
      })
      .join("");
    threePic.insertAdjacentHTML("afterbegin", result);
  } catch (error) {
    console.log(error.message);
  }
};

export default loadThreePic;
