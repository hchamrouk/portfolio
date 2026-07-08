const cube = document.getElementById("cube");
const intro = document.querySelector("#intro .bg");
const introBtn = document.querySelector("#intro .bg input");
// const form = document.querySelector("form");

let angleX = 0;
let angleY = 0;

let velocityX = 0;
let velocityY = 0;

let friction = 0.9;

// mouse
let isDragging = false;
let hasDragged = false;
let lastMouseX = 0;
let lastMouseY = 0;

// touch screen
let isTouchDragging = false;
let hasTouchDragged = false;
let lastTouchX = null;
let lastTouchY = null;

function updateIntro(){
  if (eval(localStorage.getItem("skip"))){
    introBtn.checked = true;
    intro.classList.add("hide");
  } else{
    introBtn.checked = false;
    intro.classList.remove("hide");
  }
}

function animate() {
  velocityX *= friction;
  velocityY *= friction;

  angleX += velocityX;
  angleY += velocityY;

  angleY = Math.max(-90, Math.min(90, angleY));

  cube.style.transform = `translateX(-50%) translateY(-50%) translateZ(calc(var(--square-length) / 2)) rotateX(${angleY}deg) rotateY(${angleX}deg)`;

  requestAnimationFrame(animate);
}

document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    isDragging = true;
    hasDragged = false;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    cube.style.cursor = "grabbing";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  hasDragged = false;
  cube.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;

    if (!hasDragged && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      hasDragged = true;
      intro.classList.add("hide");
    }

    velocityX -= dx * 0.02;
    velocityY += dy * 0.02;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }
});

// mobile
document.addEventListener("touchstart", (e) => {
  if (e.target.closest(".wrapper")) {
    isTouchDragging = false;
    return;
  }

  if (e.touches.length === 1) {
    isTouchDragging = true;
    hasTouchDragged = false;
    lastTouchX = e.touches[0].clientX;
    lastTouchY = e.touches[0].clientY;
  }
});

document.addEventListener("touchmove", (e) => {
  if (
    isTouchDragging &&
    e.touches.length === 1 &&
    lastTouchX !== null &&
    lastTouchY !== null
  ) {
    const touch = e.touches[0];
    const dx = touch.clientX - lastTouchX;
    const dy = touch.clientY - lastTouchY;

    if (!hasTouchDragged && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      hasTouchDragged = true;
      intro.classList.add("hide");
    }

    velocityX -= dx * 0.04;
    velocityY += dy * 0.04;

    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;
  }
});

document.addEventListener("touchend", () => {
  isTouchDragging = false;
  hasTouchDragged = false;
  lastTouchX = null;
  lastTouchY = null;
});

// intro

introBtn.addEventListener("click", () => {
  localStorage.setItem("skip", introBtn.checked);
});

window.addEventListener("load", () =>{
  updateIntro();
});

// 

animate();
