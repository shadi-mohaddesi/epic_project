let getSlider1 = async () => {
  try {
    let data = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    let res = await data.json();

    let slide = res.slider1.map((p) => {
      return `
         <div class="swiper-slide">
             <img src="${p.url}" alt="${p.alt}" />
          <div class="texts">
           <span class="paragraph">${p.paragraph}</span>  
           <span class="title">${p.title}</span>
          </div>
          <div class="buttons">
            ${p.blueBtn ? `<button class="blueBtn">${p.blueBtn}</button>` : ""}
            ${p.oldPrice ? `<del>${p.oldPrice}</del>` : ""}
            ${p.newPrice ? `<span>${p.newPrice}</span>` : ""}
            ${p.grayBtn ? `<button class="grayBtn">${p.grayBtn}</button>` : ""}
          </div>
            </div>
        `;
    });
    document
      .querySelector(".slider1 .swiper-wrapper")
      .insertAdjacentHTML("afterbegin", slide.join(""));

    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      centeredSlides: false,

      grabCursor: true,
      keyboard: {
        enabled: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 6,
          slidesPerGroup: 6,
          spaceBetween: 32,
        },
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default getSlider1;
