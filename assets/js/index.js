const navToggle = document.getElementById("header-nav-toggle");
const navBackdrop = document.getElementById("header-nav-backdrop");
const navList = document.getElementById("header-nav-list");
const navLinks = document.querySelectorAll(".header__nav-link");
const navClose = document.querySelector(".header__nav-close");

const cartIcon = document.getElementById("header-cart-icon");
const cartDetail = document.getElementById("header-cart-detail");

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

/* =================== Events =================== */

navToggle.addEventListener("click", toggleNav);

navClose.addEventListener("click", closeNav);

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", closeNav);
});

cartIcon.addEventListener("click", toggleCartDetail);
