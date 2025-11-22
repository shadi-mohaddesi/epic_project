// let left = document.querySelector(".left");
// let right = document.querySelector(".right");

// let getLeftData = async () => {
//  try {
//      let data = await fetch("http://localhost:3000/leftHero");
//      let res = await data.json();

//      let result = res.map((item) => {

//        return `
//         <div class="info">
//         <img src="${item.image}" alt="${item.title}">
//         <div class="text">
//           <h2>${item.title}</h2>
//           <p>${item.prepare}</p>
//           <p>${item.caption}</p>
//           ${item.price ? `<p>${item.price}</p>` : ""}
//           ${
//             item.playBtn
//               ? `<button class="playBtn">${item.playBtn.text}</button>`
//               : ""
//           }
//           ${
//             item.wishListBtn
//               ? `<button class="wishListBtn">${item.wishListBtn.text}</button>`
//               : ""
//           }
//         </div>
//       </div>
//         `;

//      });
//      left.innerHTML = result.join("");
//  } catch (error) {
//     console.log(error.message);
//  }

// };
// export default getLeftData

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
    let resp = await fetch("http://localhost:3000/leftHero");
    let heroes = await resp.json();

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

// hero.js

let interval = null;

export async function startLeftCycle() {
  try {
    const resp = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json",
      { cache: "no-store" } // جلوگیری از کش شدن
    );
    const data = await resp.json();

    const heroes = Array.isArray(data.leftHero) ? data.leftHero : [];
    if (!heroes.length) {
      console.warn("leftHero is empty or not an array");
      return;
    }

    // اگر قبلاً interval فعال بوده، پاک کن
    stopLeftCycle();

    // رندر اولیه
    let currentIndex = 0;
    callShow(heroes[currentIndex].id);

    // چرخه‌ی چرخش
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % heroes.length;
      callShow(heroes[currentIndex].id);
    }, 3000);
  } catch (err) {
    console.error("Error in startLeftCycle:", err);
  }
}

export function stopLeftCycle() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

// کمک‌تابع: سازگار با اسکوپ‌های مختلف
function callShow(id) {
  if (typeof showLeftHeroById === "function") {
    showLeftHeroById(id);
  } else if (typeof window !== "undefined" && typeof window.showLeftHeroById === "function") {
    window.showLeftHeroById(id);
  } else {
    console.warn("showLeftHeroById is not defined");
  }
}


export default getRightData;
