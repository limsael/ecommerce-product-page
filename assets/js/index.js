const navToggle = document.getElementById("header-nav-toggle");
const navBackdrop = document.getElementById("header-nav-backdrop");
const navList = document.getElementById("header-nav-list");
const navLinks = document.querySelectorAll(".header__nav-link");
const navClose = document.querySelector(".header__nav-close");

const cartIcon = document.getElementById("header-cart-icon");
const cartButton = document.getElementById("header-cart-button");
const cartDetail = document.getElementById("header-cart-detail");
const cartDescription = document.getElementById("header-cart-description");
const cartCount = document.getElementById("header-cart-count");
let cartQuantity = 0;

const slideContainer = document.getElementById("slide-container");
const prevBtn = document.getElementById("slide-prev");
const nextBtn = document.getElementById("slide-next");

const thumbnails = document.querySelectorAll(".main__image-thumbnail-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightBoxCloseBtn = document.querySelector(".lightbox-close");
const lightBoxPrevBtn = document.querySelector(".lightbox-prev");
const lightBoxNextBtn = document.querySelector(".lightbox-next");
const lightboxThumbnails = document.querySelectorAll(".lightbox__thumbnail");
const mainProductImages = document.querySelectorAll(".main__image-main");
let lightboxCurrentIndex = 0;

const checkoutForm = document.getElementById("main-checkout-form");
const checkoutFormInput = document.getElementById("main-checkout-form-input");
const checkoutFormDecrement = document.getElementById("main-form-minus");
const checkoutFormIncrement = document.getElementById("main-form-plus");

/* =================== Functions =================== */

function toggleNav() {
  navBackdrop.classList.add("active");
  navList.classList.add("active");
}

function closeNav() {
  navBackdrop.classList.remove("active");
  navList.classList.remove("active");
}

function renderCart() {
  cartCount.textContent = cartQuantity;
  cartCount.hidden = cartQuantity === 0;

  if (cartQuantity === 0) {
    cartDescription.innerHTML = '<p class="header__user-cart-empty">Your cart is empty.</p>';
    return;
  }

  const total = (125 * cartQuantity).toFixed(2);
  cartDescription.innerHTML = `
    <div class="header__user-cart-item">
      <img class="header__user-cart-item-image" src="./images/image-product-1-thumbnail.jpg" alt="" />
      <p class="header__user-cart-item-name">
        Fall Limited Edition Sneakers<br />
        $125.00 x ${cartQuantity} <span class="header__user-cart-item-total">$${total}</span>
      </p>
      <button class="header__user-cart-delete" type="button" aria-label="Remove product from cart">
        <img src="./images/icon-delete.svg" alt="" />
      </button>
    </div>
    <button class="header__user-cart-checkout" type="button">Checkout</button>
  `;

  cartDescription.querySelector(".header__user-cart-delete").addEventListener("click", () => {
    cartQuantity = 0;
    renderCart();
  });

  cartDescription.querySelector(".header__user-cart-checkout").addEventListener("click", () => {
    alert(`Checkout ${cartQuantity} item${cartQuantity === 1 ? "" : "s"} totaling $${total}.`);
  });
}

function toggleCartDetail() {
  const isOpen = cartDetail.classList.toggle("active");
  cartButton.setAttribute("aria-expanded", String(isOpen));
}

function getFullSizeSrc(thumbnailSrc) {
  return thumbnailSrc.replace("-thumbnail", "");
}

function updateLightbox(index) {
  lightboxCurrentIndex = index;
  lightboxImg.src = getFullSizeSrc(thumbnails[index].src);
  lightboxThumbnails.forEach((thumbnail, thumbnailIndex) => {
    thumbnail.classList.toggle("active", thumbnailIndex === index);
  });
}

function openLightbox(index) {
  updateLightbox(index);
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
  lightBoxCloseBtn.focus();
}

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}

function showNext() {
  updateLightbox((lightboxCurrentIndex + 1) % thumbnails.length);
}

function showPrev() {
  updateLightbox(
    (lightboxCurrentIndex - 1 + thumbnails.length) % thumbnails.length,
  );
}

function handleCheckoutFormDecrement() {
  const currentQuantity = Number.parseInt(checkoutFormInput.value, 10) || 0;
  checkoutFormInput.value = Math.max(0, currentQuantity - 1);
}

function handleCheckoutFormIncrement() {
  const currentQuantity = Number.parseInt(checkoutFormInput.value, 10) || 0;
  checkoutFormInput.value = currentQuantity + 1;
}

function handleCheckoutForm(e) {
  e.preventDefault();

  const selectedQuantity = Number.parseInt(checkoutFormInput.value, 10);

  if (!Number.isInteger(selectedQuantity) || selectedQuantity <= 0) {
    alert("Please enter a number greater than 0 to add to the cart.");
    checkoutFormInput.value = 0;
    return;
  }

  cartQuantity += selectedQuantity;
  checkoutFormInput.value = 0;
  renderCart();
  cartDetail.classList.add("active");
  cartButton.setAttribute("aria-expanded", "true");
}

function moveSlidePrev() {
  const slideWidth = slideContainer.clientWidth;

  slideContainer.scrollBy({
    left: -slideWidth,
    behavior: "smooth",
  });
}

function moveSlideNext() {
  const slideWidth = slideContainer.clientWidth;

  slideContainer.scrollBy({
    left: slideWidth,
    behavior: "smooth",
  });
}

/* =================== Events =================== */

navToggle.addEventListener("click", toggleNav);

navClose.addEventListener("click", closeNav);

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", closeNav);
});

cartButton.addEventListener("click", toggleCartDetail);
renderCart();

checkoutForm.addEventListener("submit", handleCheckoutForm);

checkoutFormDecrement.addEventListener("click", handleCheckoutFormDecrement);

checkoutFormIncrement.addEventListener("click", handleCheckoutFormIncrement);

prevBtn.addEventListener("click", moveSlidePrev);
nextBtn.addEventListener("click", moveSlideNext);

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    openLightbox(index);
  });
});

mainProductImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    if (window.matchMedia("(min-width: 992px)").matches) {
      openLightbox(index);
    }
  });
});

lightboxThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => updateLightbox(index));
});

lightBoxCloseBtn.addEventListener("click", closeLightbox);
lightBoxNextBtn.addEventListener("click", showNext);
lightBoxPrevBtn.addEventListener("click", showPrev);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("click", (e) => {
  if (
    cartDetail.classList.contains("active") &&
    !cartDetail.contains(e.target) &&
    !cartButton.contains(e.target)
  ) {
    cartDetail.classList.remove("active");
    cartButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cartDetail.classList.contains("active")) {
    cartDetail.classList.remove("active");
    cartButton.setAttribute("aria-expanded", "false");
  }

  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  }
});
