document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelector(".add-to-cart");
  const buyNowButton = document.querySelector(".buy-now");

  addToCartButton.addEventListener("click", () => {
    alert("Game added to cart!");
  });

  buyNowButton.addEventListener("click", () => {
    alert("Proceeding to checkout!");
  });
});

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;

const totalSlides = slider.children.length;

function updateSliderPosition() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSliderPosition();
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSliderPosition();
});

document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.querySelector(".add-to-cart");
  const buyNowButton = document.querySelector(".buy-now");
  const wishlistButton = document.querySelector(".add-to-wishlist");
  const cartIndicator = document.querySelector("#cart-indicator");
  const wishlistIndicator = document.querySelector("#wishlist-indicator");

  // Load cart and wishlist from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Update indicators
  updateIndicators();

  // Add event listeners
  cartButton.addEventListener("click", () => {
    if (cart.length >= 10) {
      alert("Cart is full! Remove some items to add more.");
      return;
    }

    const game = getGameDetails();
    if (!cart.find((item) => item.id === game.id)) {
      cart.push(game);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Game added to cart!");
      updateIndicators();
    } else {
      alert("Game is already in the cart.");
    }
  });

  buyNowButton.addEventListener("click", () => {
    alert("Proceeding to checkout!");
  });

  wishlistButton.addEventListener("click", () => {
    const game = getGameDetails();
    if (!wishlist.find((item) => item.id === game.id)) {
      wishlist.push(game);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Game added to wishlist!");
      updateIndicators();
    } else {
      alert("Game is already in the wishlist.");
    }
  });

  function getGameDetails() {
    const title = document.querySelector(".description h2").innerText;
    const price = document.querySelector(".price").innerText;
    return { id: title, title, price }; // ID is the game title for simplicity
  }

  function updateIndicators() {
    cartIndicator.innerText = cart.length;
    wishlistIndicator.innerText = wishlist.length;
  }
});
