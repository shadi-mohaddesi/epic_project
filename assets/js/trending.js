
 let trendingItems = document.querySelectorAll(".trending .items .eachItem");

let loadTrending = async () => {
  try {
    let res = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    // let data = await res.json();
    const fullDB = await res.json();
    const data = fullDB.trending;
    
    data.forEach((i,idx) => {
      if (trendingItems[idx]) {
        let result = `
          <img src="${i.url}" alt="${i.alt}" />
          <div class="text">
            ${
              i.littleTXT ? `<span class="littleTXT">${i.littleTXT}</span>` : ""
            }
            <h4>${i.title}</h4>
            ${i.grayBtn ? `<button class="grayBtn">${i.grayBtn}</button>` : ""}
            ${i.blueBtn ? `<button class="blueBtn">${i.blueBtn}</button>` : ""}
            ${
              i.availability
                ? `<span class="avail">${i.availability}</span>`
                : ""
            }
            ${i.price ? `<span class="price">${i.price}</span>` : ""}
          </div>
        `;

        trendingItems[idx].insertAdjacentHTML("afterbegin", result);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default loadTrending;
