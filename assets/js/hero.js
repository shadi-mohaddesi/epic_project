// hero.js

const left = document.querySelector(".left");
const right = document.querySelector(".right");

let interval = null;
let heroesCache = null;
let rightHeroesCache = null;

// render left hero by id
export function showLeftHeroById(id) {
  if (!heroesCache) {
    console.warn("heroesCache not loaded yet");
    return;
  }
  const hero = heroesCache.find((h) => h.id === id);
  if (hero) renderHero(hero);
}

function renderHero(hero) {
  left.innerHTML = `
    <div class="info active">
      <img src="${hero.image}" alt="${hero.title}">
      <div class="text">
        <h2>${hero.title}</h2>
        <p>${hero.prepare}</p>
        <p>${hero.caption}</p>
        ${hero.price ? `<p>${hero.price}</p>` : ""}
        ${
          hero.playBtn?.text
            ? `<button class="playBtn">${hero.playBtn.text}</button>`
            : ""
        }
        ${
          hero.wishListBtn?.text
            ? `<button class="wishListBtn">${hero.wishListBtn.text}</button>`
            : ""
        }
      </div>
    </div>
  `;
}

// cycle through leftHero
export async function startLeftCycle() {
  try {
    const resp = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json",
      { cache: "no-store" }
    );
    const data = await resp.json();

    heroesCache = Array.isArray(data.leftHero) ? data.leftHero : [];
    if (!heroesCache.length) {
      console.warn("leftHero is empty or not an array");
      return;
    }

    stopLeftCycle();

    let currentIndex = 0;
    showLeftHeroById(heroesCache[currentIndex].id);

    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % heroesCache.length;
      showLeftHeroById(heroesCache[currentIndex].id);
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

// fetch and render rightHero thumbnails
export async function getRightData() {
  try {
    const resp = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json",
      { cache: "no-store" }
    );
    const data = await resp.json();

    rightHeroesCache = data.rightHero || [];
    if (!Array.isArray(rightHeroesCache)) {
      console.warn("rightHero is not an array");
      return;
    }

    const html = rightHeroesCache
      .map(
        (item) => `
          <div class="thumb" data-id="${item.id}">
            <a href="#">
              <img src="${item.url}" alt="${item.alt}" />
              <span>${item.title}</span>
            </a>
          </div>
        `
      )
      .join("");

    right.innerHTML = html;

    document.querySelectorAll(".thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const id = parseInt(thumb.dataset.id, 10);
        showLeftHeroById(id);
      });
    });
  } catch (error) {
    console.error("Error in getRightData:", error);
  }
}

export default getRightData;
