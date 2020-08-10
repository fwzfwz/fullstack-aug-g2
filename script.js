function changeToHomePage() {
    let about = document.getElementById("about-page");
    about.style.display = "none";
    let home = document.getElementById("home-page");
    home.style.display = "block";
}

function changeToAboutPage() {
    let about = document.getElementById("home-page");
    about.style.display = "none";
    let home = document.getElementById("about-page");
    home.style.display = "block";
}