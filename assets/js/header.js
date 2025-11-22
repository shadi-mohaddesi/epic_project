let navBar = document.querySelector(".collapse ul");

let getData = async () => {
  try {
    let res = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );

    let data = await res.json();
    
     let result = data.navbar
       .map((item) => {
         
         if (item.id === "storeLogo") {
           return `
          <li class="nav-item">
            <img src="${item.url}" alt="${item.alt}" />
          </li>
        `;
         }

         
         if (item.id === "menuLink") {
           return `
          <li class="nav-item">
            <a class="nav-link" href="${item.href}">${item.title}</a>
          </li>
        `;
         }

         
         if (item.id === "dropDownLink") {
           let dropdownItems = item.dropdownMenu
             .map((drop) => {
               return `<li><a class="dropdown-item" href="${drop.href}">${drop.title}</a></li>`;
             })
             .join("");

           return `
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="${item.href}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${item.title}
            </a>
            <ul class="dropdown-menu">
              ${dropdownItems}
            </ul>
          </li>
        `;
         }
       })
       .join("");

     navBar.insertAdjacentHTML("afterbegin",result);
      



  } catch (error) {
    console.log(error.message);
  }
};

export default getData;