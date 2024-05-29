let currentIndex = 0;

function moveSlide(direction) {
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  const carouselInner = document.querySelector(".carousel-inner");

  // 실제 아이템 개수 (복제된 슬라이드 제외)
  const actualTotalItems = totalItems - 1;

  currentIndex =
    (currentIndex + direction + actualTotalItems) % actualTotalItems;

  // 애니메이션으로 이동
  carouselInner.style.transition = "transform 0.5s ease";
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

  // 마지막 슬라이드에서 첫 번째 슬라이드로 이동할 때
  if (currentIndex === actualTotalItems - 1 && direction === 1) {
    setTimeout(() => {
      carouselInner.style.transition = "none";
      carouselInner.style.transform = "translateX(0)";
      // carouselInner.style.transition = "transform 0.5s ease";
      // carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      currentIndex = 0;
    }, 2000); // 애니메이션 지속 시간과 동일하게 설정
  }
}

let autoPlay = setInterval(() => moveSlide(1), 3000);

document
  .querySelector(".carousel")
  .addEventListener("mouseover", () => clearInterval(autoPlay));
document
  .querySelector(".carousel")
  .addEventListener(
    "mouseout",
    () => (autoPlay = setInterval(() => moveSlide(1), 2000))
  );
