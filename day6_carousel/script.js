let currentIndex = 0;

function moveSlide(direction) {
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  const carouselInner = document.querySelector(".carousel-inner");

  currentIndex = (currentIndex + direction + totalItems) % totalItems;

  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

let autoPlay = setInterval(() => moveSlide(1), 3000);

document
  .querySelector(".carousel")
  .addEventListener("mouseover", () => clearInterval(autoPlay));
document
  .querySelector(".carousel")
  .addEventListener(
    "mouseout",
    () => (autoPlay = setInterval(() => moveSlide(1), 3000))
  );
