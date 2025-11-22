const discoverList = document.querySelector(".discover_menu");

async function loadDiscoverMenu() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    const data = await res.json();

    const searchItem = `
      <li>
        <input type="text" class="search_bar" placeholder="Search Store" />
      </li>
    `;

    const menuItems = data.discoverMenu.map((item) => {
        return `<li><a href="${item.href}">${item.title}</a></li>`;
      })
      .join("");

    // 🔹 Combine and render
    discoverList.innerHTML = searchItem + menuItems;
  } catch (err) {
    console.error("Error loading discover menu:", err);
  }
}


export default loadDiscoverMenu;
