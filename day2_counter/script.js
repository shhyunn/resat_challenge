let timer;
let remainingTime;
let pausedTime;

function updateTime() {
  if (remainingTime <= 0) {
    clearInterval(timer);
    timer = null;
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    document.querySelector(".input-container").classList.remove("hidden");
    return;
  }

  remainingTime--;

  const hrs = String(Math.floor(remainingTime / 3600)).padStart(2, "0");
  const mins = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, "0");
  const secs = String(remainingTime % 60).padStart(2, "0");

  document.getElementById("timer").textContent = `${hrs}:${mins}:${secs}`;
}

document.getElementById("startBtn").addEventListener("click", function () {
  if (timer) return;

  if (pausedTime !== undefined) {
    remainingTime = pausedTime;
  } else {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    remainingTime = hours * 3600 + minutes * 60 + seconds;
  }

  if (remainingTime > 0) {
    document.querySelector(".input-container").classList.add("hidden");
    timer = setInterval(updateTime, 1000);
  }
});

document.getElementById("stopBtn").addEventListener("click", function () {
  if (timer) {
    clearInterval(timer);
    pausedTime = remainingTime;
    timer = null;
  }
});

document.getElementById("resetBtn").addEventListener("click", function () {
  clearInterval(timer);
  timer = null;
  remainingTime = 0;
  pausedTime = undefined;
  document.getElementById("timer").textContent = "00:00:00";
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
  document.querySelector(".input-container").classList.remove("hidden");
});
