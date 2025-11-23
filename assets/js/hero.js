let right = document.querySelector(".right");
let left = document.querySelector(".left");

let getRightData = async () => {
  try {
    let rightData = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    // let resForRight = await rightData.json();
    const fullDB = await rightData.json();
    const resForRight = fullDB.rightHero;

    let rightResult = resForRight.map((item) => {
      return `
         <div class="thumb" data-id="${item.id}">
            <a href="#">
              <img src="${item.url}" alt="${item.alt}" />
              <span>${item.title}</span>
              
            </a>
          </div>
        `;
    });

    right.innerHTML = rightResult.join("");

    document.querySelectorAll(".thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        let id = parseInt(thumb.dataset.id); // get id from thumbnail
        showLeftHeroById(id); // show hero in left section
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

async function showLeftHeroById(id) {
  try {
    let resp = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    let fullDB = await resp.json();
    let heroes = fullDB.leftHero;

    // find hero with matching id
    let hero = heroes.find((h) => h.id === id);

    if (hero) {
      left.innerHTML = `
        <div class="info active">
          <img src="${hero.image}" alt="${hero.title}">
          <div class="text">
            <h2>${hero.title}</h2>
            <p>${hero.prepare}</p>
            <p>${hero.caption}</p>
            ${hero.price ? `<p>${hero.price}</p>` : ""}
            ${
              hero.playBtn && hero.playBtn.text
                ? `<button class="playBtn">${hero.playBtn.text}</button>`
                : ""
            }
            ${
              hero.wishListBtn && hero.wishListBtn.text
                ? `<button class="wishListBtn">${hero.wishListBtn.text}</button>`
                : ""
            }
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
}

let interval;

export async function startLeftCycle() {
  let resp = await fetch(
    "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
  );
  let fullDB = await resp.json();
  let heroes = fullDB.leftHero;

  let currentIndex = 0;
  interval = setInterval(() => {
    currentIndex++;
    if (currentIndex >= heroes.length) {
      currentIndex = 0;
    }
    showLeftHeroById(heroes[currentIndex].id);
  }, 3000);
}

export default getRightData;
