let listContainers = document.querySelectorAll(".lines > ul > li > .listContainer");

async function loadListTitle() {
  let res = await fetch(
    "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
  );
  // let sections = await res.json();
  const fullDB = await res.json();
  const sections = fullDB.listTitle;

  sections.forEach((sec, index) => {
    if (listContainers[index]) {
      listContainers[index].querySelector(".title").textContent = sec.title;
    }
  });
}

export default loadListTitle;

