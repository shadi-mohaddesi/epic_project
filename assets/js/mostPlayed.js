let container = document.querySelectorAll(".listContainer .secondUL");

let getMostPlayedData = async () => {
  try {
    let res = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    const fullDB = await res.json();
    const list = fullDB.MostPlayed;

    let getListItems = list
      .map((item) => {
        return `
          <li>
            <div>
              <a href="${item.href}">
                <img src="${item.url}" alt="${item.alt}" />
                <div class="text">
                  <h6>${item.title}</h6>
                  <div class="up">
                    ${
                      item.grayBtn
                        ? `<button class="grayBtn">${item.grayBtn}</button>`
                        : ""
                    }
                    ${item.soon ? `<span class="soon">${item.soon}</span>` : ""}
                  </div>
                  <div class="down">
                    ${
                      item.oldPrice
                        ? `<span class="oldPrice">${item.oldPrice}</span>`
                        : ""
                    }
                    ${
                      item.newPrice
                        ? `<span class="newPrice">${item.newPrice}</span>`
                        : ""
                    }
                    ${
                      item.blueBtn
                        ? `<button class="blueBtn">${item.blueBtn}</button>`
                        : ""
                    }
                  </div>
                </div>
              </a>
            </div>
          </li>`;
      })
      .join("");

    container.forEach((ul) => {
      ul.insertAdjacentHTML("beforeend", getListItems);
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default getMostPlayedData;
