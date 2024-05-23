const calendarContainer = document.getElementById("calendar");
const memoContainer = document.getElementById("memo-container");
const memoTextarea = document.getElementById("memo");
const saveMemoButton = document.getElementById("save-memo");
const monthYearHeader = document.getElementById("month-year");
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const memos = {};

document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

saveMemoButton.addEventListener("click", () => {
  const selectedDate = memoTextarea.dataset.date;
  memos[selectedDate] = memoTextarea.value;
  memoContainer.style.display = "none";
  renderCalendar(currentYear, currentMonth);
});

function renderCalendar(year, month) {
  calendarContainer.innerHTML = "";
  monthYearHeader.textContent = `${year}년 ${month + 1}월`;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarContainer.appendChild(document.createElement("div"));
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayCell = document.createElement("div");
    const date = `${year}-${month + 1}-${i}`;
    dayCell.textContent = i;
    dayCell.dataset.date = date;

    if (memos[date]) {
      const memoIndicator = document.createElement("span");
      memoIndicator.textContent = "•";
      memoIndicator.classList.add("memo-indicator");
      dayCell.appendChild(memoIndicator);
    }

    dayCell.addEventListener("click", () => {
      memoContainer.style.display = "flex";
      memoTextarea.dataset.date = date;
      memoTextarea.value = memos[date] || "";
    });

    calendarContainer.appendChild(dayCell);
  }
}

renderCalendar(currentYear, currentMonth);
