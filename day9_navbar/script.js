const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", () => {
  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-250px";
  } else {
    sidebar.style.right = "0";
  }
});

document.addEventListener("click", (event) => {
  if (!hamburger.contains(event.target) && !sidebar.contains(event.target)) {
    sidebar.style.right = "-250px";
  }
});
