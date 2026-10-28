const navToggle = document.getElementById("header-nav-toggle");
const navBackdrop = document.getElementById("header-nav-backdrop");
const navList = document.getElementById("header-nav-list");
const navLinks = document.querySelectorAll(".header__nav-link");
const navClose = document.querySelector(".header__nav-close");

const cartIcon = document.getElementById("header-cart-icon");
const cartDetail = document.getElementById("header-cart-detail");

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

function toggleCartDetail() {
  cartDetail.classList.toggle("active");
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
  if (checkoutFormInput.value > 0) {
    checkoutFormInput.value--;
  }
}

function handleCheckoutFormIncrement() {
  checkoutFormInput.value++;
}

function handleCheckoutForm(e) {
  e.preventDefault();

  if (checkoutFormInput.value <= 0 || isNaN(checkoutFormInput.value)) {
    alert("Please enter a number greater than 0 to checkout.");
    checkoutFormInput.value = 0;
  } else {
    alert(
      `You have successfully checked out ${checkoutFormInput.value} items!`,
    );
    checkoutFormInput.value = 0;
  }
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

cartIcon.addEventListener("click", toggleCartDetail);

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

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  }
});
