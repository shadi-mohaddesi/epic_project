let freeGame = document.querySelector(".freeGames .images");

let loadFreeGames= async ()=>{
    let res = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    let data = await res.json();

    let result = data.freeGames.map((i)=>{
        return `
            <div class="eachOne">
             <div class="img">
                <img src="${i.url}" alt="${i.alt}">
                 ${
                   i.underImg
                     ? `<span class="underImg">${i.underImg}</span>`
                     : ""
                 }
                ${
                  i.underImgBlack
                    ? `<span class="underImgBlack">${i.underImgBlack}</span>`
                    : ""
                }
             </div>
             <div class="text">
                <h4>${i.title}</h4>
                <span>${i.availability.status} <time datetime="">${
          i.availability.date
        }</time> <time datetime="">${i.availability.time}</time></span>
             </div>
            </div>
        `;

        
    }).join("");

    freeGame.insertAdjacentHTML("beforeend",result);
}

export default loadFreeGames;