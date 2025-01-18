// script.js
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
});
//thumbnail.js
import { slideData } from "./js/slideData.js";

const slides = document.querySelector('.slides')
const slideThumbs = document.querySelector('.slideThumbs')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

let currentIndex = 0
let timeOutId;
let duration = 5000

// buat aktif tumb
function activeThumb() {
  document.querySelectorAll('.slideThumb').forEach((thumb, index) => // 'slideThumb' => '.slideThumb'
    thumb.classList.toggle('activeThumb', index === currentIndex)
  );
}

//display single klo aktif
function display() {
  const slide = slideData[currentIndex]
  slides.innerHTML = `
      <div class="slide">
          <img src="${slide.image}" alt="">
          <div class="info">
            <div class="desc">
              <p class="avail">${slide.availability}</p>
              <p>${slide.desc}</p>
            </div>
            <div class="action_btns">
              <div class="price">
                ${slide.discount !== "" ? `<p class="discount">-${slide.discount} </p>` : ""}
                ${slide.oldPrice !== "" ? `<p class="oldPrice">-${slide.oldPrice} </p>` : ""}
                ${slide.price !== "" ? `<p class="newPrice">-${slide.price} </p>` : `<p class="newPrice">Free</p>`}
              </div>
              <div class="btn">
                <button class="btn_buy">${slide.button}</button>
                <button class="btn_wishlist"><span><i class='bx bxs-plus-circle'></i></span>Add to wishlist</button>
              </div>
            </div>
          </div>
        </div>
  `

  activeThumb()
}

//reset timeout
function resetSlideShow() {
  clearTimeout(timeOutId);
  timeOutId = setTimeout(slideShow, duration);
}

//buat thumb
function handleThumb(index) {
  currentIndex = index;
  display()
  resetSlideShow()
}

//thumbs
function renderThumbs() {
  let thumbs = slideData.map((item, index) => (
    `
    <div class="slideThumb" data-index="${index}" style="--duration: ${duration}ms;">
        <img src="${item.thumb}" alt="">
        <p class="title">${item.title}</p>
      </div>
    `
  )).join("");

  slideThumbs.innerHTML = thumbs;

  slideThumbs.addEventListener("click", (e) => {
    const thumb = e.target.closest(".slideThumb")
    if (thumb) {
      const index = parseInt(thumb.dataset.index, 10)
      handleThumb(index)
    }
  })
}

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slideData.length) % slideData.length
  display()
  resetSlideShow()
})

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slideData.length;
  display()
  resetSlideShow()
})

//slide show
function slideShow() {
  currentIndex = (currentIndex + 1) % slideData.length;
  display();
  timeOutId = setTimeout(slideShow, duration);
}

renderThumbs()
display()
timeOutId = setTimeout(slideShow, duration)
//new
const newSwiper = new Swiper('.new-swipper', {
  slidesPerView: 4,
  spaceBetween: 15,
  navigation: {
    nextEl: '.next-btn',
    prevEl: '.prev-btn',
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1,
    },
  },
});
//diskon
const discountSwiper = new Swiper('.diskon-swiper', {
  slidesPerView: 4,
  spaceBetween: 15,
  navigation: {
    nextEl: '.next-btnn',
    prevEl: '.prev-btnn',
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1,
    },
  },
});
//free
const freeSwiper = new Swiper('.free-swiper', {
  slidesPerView: 4,
  spaceBetween: 15,
  navigation: {
    nextEl: '.next-bttn',
    prevEl: '.prev-bttn',
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1,
    },
  },
});
//categories
const currentPage = location.pathname.split("/").pop();

document.querySelectorAll('.categories-grid a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
//footer
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}


