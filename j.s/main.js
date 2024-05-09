//local storage for colors
let mainColors = localStorage.getItem("color");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".option-box .colors-list li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === mainColors) {
      li.classList.add("active");
    }
  });
}

//toggle for setting box
let settingBox = document.querySelector(".setting-box");
let gearIcon = document.querySelector(".setting-box .setting-icon");
gearIcon.addEventListener("click", () => {
  settingBox.classList.toggle("open");
});

//change root color
let colorList = document.querySelectorAll(" .option-box .colors-list li");
colorList.forEach((list) => {
  list.onclick = function (e) {
    handleActive(e);

    document.documentElement.style.setProperty(
      "--main-color",
      `${e.currentTarget.dataset.color}`
    );
    localStorage.setItem("color", `${e.currentTarget.dataset.color}`);
  };
});
//random-background

let landingPage = document.querySelector(".landing-page");
let imgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
let backgroundbtns = document.querySelectorAll(".random-background span");
let backgroundrand = true;
let intervalbackground;
//check for value in local storage
let background_random = localStorage.getItem("background_random");
if (background_random !== null) {
  if (background_random === "true") {
    backgroundrand = true;
  } else {
    backgroundrand = false;
  }
  document.querySelectorAll(".random-background span").forEach((btn) => {
    btn.classList.remove("active");
  });
  if (background_random === "true") {
    document
      .querySelector(".random-background span.yes")
      .classList.add("active");
  } else {
    document
      .querySelector(".random-background span.no")
      .classList.add("active");
  }
}

backgroundbtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleActive(e);
    if (e.currentTarget.dataset.background === "yes") {
      backgroundrand = true;
      randombackground();
      localStorage.setItem("background_random", true);
    } else {
      backgroundrand = false;
      clearInterval(intervalbackground);
      localStorage.setItem("background_random", false);
    }
  });
});

function randombackground() {
  if (backgroundrand === true) {
    intervalbackground = setInterval(() => {
      let randNum = Math.floor(Math.random() * imgs.length);
      landingPage.style.backgroundImage = `url("./imgs/${imgs[randNum]}")`;
    }, 10000);
  }
}

randombackground();

//bullets show and hide
let bulletSpans = document.querySelectorAll(".bullets-box span");
let bulletsContainer = document.querySelector(".bullets-container");
// bullets in local storage
let LocalBullets = localStorage.getItem("bullets-option");
if (LocalBullets !== null) {
  bulletSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (LocalBullets === "block") {
    document.querySelector(".bullets-box span.yes").classList.add("active");
    bulletsContainer.style.display = "block";
  } else {
    document.querySelector(".bullets-box span.no").classList.add("active");
    bulletsContainer.style.display = "none";
  }
}
bulletSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.currentTarget.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
  });
});

//skills progress
let ourskills = document.querySelector(".skills");
let skillspans = document.querySelectorAll(".skills .skill-box span");
window.onscroll = function () {
  let offsettopskills = ourskills.offsetTop;
  let offssetheight = ourskills.offsetHeight;
  let windowScrollTop = window.scrollY;
  let windowheight = window.innerHeight;

  if (windowScrollTop > offsettopskills + offssetheight - windowheight) {
    skillspans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

//popup image
let images = document.querySelectorAll(".images-box img");
images.forEach((img) => {
  img.addEventListener("click", () => {
    let overlayDiv = document.createElement("div");
    overlayDiv.className = "overlay";
    document.body.appendChild(overlayDiv);
    let popupDiv = document.createElement("div");
    popupDiv.className = "popup-box";

    if (img.alt !== null) {
      let heading = document.createElement("h3");
      let txt = document.createTextNode(img.alt);
      heading.appendChild(txt);
      popupDiv.appendChild(heading);
    }
    let newimg = document.createElement("img");
    newimg.src = img.src;
    newimg.className = "popup-img";
    let span = document.createElement("span");
    span.className = "close-btn";
    let txtspan = document.createTextNode("X");
    span.appendChild(txtspan);
    popupDiv.appendChild(span);
    popupDiv.appendChild(newimg);
    document.body.appendChild(popupDiv);
    span.addEventListener("click", () => {
      overlayDiv.remove();
      popupDiv.remove();
    });
  });
});

//tooltip
let bullets = document.querySelectorAll(".bullets-container .bullet");
let links = document.querySelectorAll(".links a");

function scrollToTarget(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
scrollToTarget(bullets);
scrollToTarget(links);

//handle active
function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  e.target.classList.add("active");
}

//   reset btn

document.querySelector(".reset-button").addEventListener("click", () => {
  localStorage.removeItem("color");
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("background_random");
  window.location.reload();
});

//toggle menu
let tMenu = document.querySelector(".header .toggle-menu");
let tLinks = document.querySelector(".header .links");
tMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  tMenu.classList.toggle("active-toggle");
  tLinks.classList.toggle("open");
});
tLinks.addEventListener("click", (e) => {
  e.stopPropagation();
});
//close menu if i  click outside of it

document.addEventListener("click", (e) => {
  if (e.target !== tMenu && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      tMenu.classList.toggle("active-toggle");
      tLinks.classList.toggle("open");
    }
  }
});
