const loadTitles = async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    // const data = await res.json();
    const fullDB = await res.json();

    const data = fullDB.footerAcTitles;

    const accordionItem = document.querySelectorAll(".accordion-item h2");
    const accordionBodies = document.querySelectorAll(
      ".accordion-item .accordion-body ul"
    );

    accordionItem.forEach((item, index) => {
      const titleHTML = `
        <button
          class="accordion-button collapsed bg-transparent text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapse${index}"
          aria-expanded="false"
          aria-controls="flush-collapse${index}"
        >
          ${data[index] ? data[index].name : ""}
        </button>
        `;
      item.innerHTML = titleHTML;
    });

    accordionBodies.forEach((item, index) => {
      if (data[index] && Array.isArray(data[index].links)) {
        const bodyHTML = data[index].links
          .map((link) => {
            return `
                <li class="mb-1"><a href="${link.url}" class=" text-decoration-none">${link.title}</a></li> 
                 `;
          })
          .join("");

        item.innerHTML = bodyHTML;
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default loadTitles;
