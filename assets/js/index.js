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
