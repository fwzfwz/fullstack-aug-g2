let homeNav = document.getElementById("home-nav");
let coursesNav = document.getElementById("courses-nav");
let aboutNav = document.getElementById("about-nav");
let contactNav = document.getElementById("contact-nav");
let galleryNav = document.getElementById("gallery-nav");

let contact = null;

init();

function init() {
  homeNav.addEventListener("click", () => changeDisplayProp("home-page", homeNav));
  coursesNav.addEventListener("click", () => changeDisplayProp("courses-page", coursesNav));
  aboutNav.addEventListener("click", () => changeDisplayProp("about-page", aboutNav));
  contactNav.addEventListener("click", () => changeDisplayProp("contact-page", contactNav));
  galleryNav.addEventListener("click", () => changeDisplayProp("gallery-page", galleryNav));
  document.getElementById("send").addEventListener("click", () => {
    contact = {
      name: document.getElementById("inputName").value,
      email: document.getElementById("inputEmail").value,
      message: document.getElementById("inputMessage").value,
      newsletter: document.getElementById("newsletter").checked
    };
    console.log(contact);
  });
  hideAll();
  homeNav.click();
}

function hideAll() {
  document.getElementById("home-page").style.display = "none";
  homeNav.className = "nav-link";
  document.getElementById("courses-page").style.display = "none";
  coursesNav.className = "nav-link";
  document.getElementById("about-page").style.display = "none";
  aboutNav.className = "nav-link";
  document.getElementById("contact-page").style.display = "none";
  contactNav.className = "nav-link";
  document.getElementById("gallery-page").style.display = "none";
  galleryNav.className = "nav-link";
}

function changeDisplayProp(el, nav) {
  hideAll();
  document.getElementById(el).style.display = "block";
  nav.className = "nav-link active";
}