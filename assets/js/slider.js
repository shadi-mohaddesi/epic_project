

 let getSliders = async () => {
  try {

    

    let data = await fetch(
      "https://raw.githubusercontent.com/shadi-mohaddesi/db-epic/main/db.json"
    );
    let res = await data.json();

    
    let slide = res.slider.map((s) => {
      return `
         <div class="swiper-slide">
              <img
                src="${s.url}"
                alt="${s.alt}"
              />
              <div class="texts">
                <span class="littleTXT">${s.littleTXT}</span>
                <span class="title">${s.title}</span>
                <span class="price">${s.price}</span>
              </div>
            </div>
        `;
    });
    document
      .querySelector(".slider .swiper-wrapper")
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

export default getSliders
