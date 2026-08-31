document.addEventListener("DOMContentLoaded", () => {
  const TARGET_MONTHLY_EXP = 3000;

  // Format Tanggal Otomatis
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("id-ID", options);

  const dateTextElem = document.getElementById("current-date-text");
  if (dateTextElem) dateTextElem.textContent = formattedDate;

  // Key localStorage unik YYYY-MM-DD & YYYY-MM
  const dateKey = `myahealth_tracker_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const monthlyKey = `myahealth_monthly_exp_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  // Element References
  const checkboxes = document.querySelectorAll(".custom-checkbox-input");
  const dailyExpElem = document.getElementById("daily-exp-counter");
  const monthlyExpElem = document.getElementById("monthly-exp-counter");
  const progressBarElem = document.getElementById("monthly-progress-bar");
  const progressPercentElem = document.getElementById("progress-percentage");
  const gradeBadgeElem = document.getElementById("grade-badge");
  const gradeDescElem = document.getElementById("grade-desc");

  // State Management
  let savedState = JSON.parse(localStorage.getItem(dateKey)) || {};
  let baseMonthlyExp = parseInt(localStorage.getItem(monthlyKey) || "0", 10);

  // Counter Animation Angka
  function animateCounter(element, start, end, duration = 400) {
    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range)) || 10;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = current;
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Sync UI Checkbox Visuals
  function syncCheckboxStyles(input) {
    const label = input.nextElementSibling;
    const icon = label.querySelector(".bx-check");
    const taskText = label.querySelector(".task-label");

    if (input.checked) {
      icon.classList.remove("opacity-0");
      taskText.classList.add("line-through", "text-[#5B6168]");
    } else {
      icon.classList.add("opacity-0");
      taskText.classList.remove("line-through", "text-[#5B6168]");
    }
  }

  // Update Calculations
  function updateCalculations(isInitial = false) {
    let currentDailyExp = 0;

    checkboxes.forEach((cb) => {
      if (cb.checked) {
        currentDailyExp += parseInt(cb.getAttribute("data-exp"), 10);
      }
    });

    const prevDailyExp = parseInt(dailyExpElem.textContent, 10) || 0;
    const totalMonthlyExp = baseMonthlyExp + currentDailyExp;
    const prevMonthlyExp = parseInt(monthlyExpElem.textContent, 10) || 0;

    if (isInitial) {
      dailyExpElem.textContent = currentDailyExp;
      monthlyExpElem.textContent = totalMonthlyExp;
    } else {
      animateCounter(dailyExpElem, prevDailyExp, currentDailyExp);
      animateCounter(monthlyExpElem, prevMonthlyExp, totalMonthlyExp);
    }

    const percentage = Math.min(
      Math.round((totalMonthlyExp / TARGET_MONTHLY_EXP) * 100),
      100,
    );
    progressBarElem.style.width = `${percentage}%`;
    progressPercentElem.textContent = `${percentage}%`;

    updateGrade(percentage);
  }

  function updateGrade(percentage) {
    if (percentage >= 80) {
      gradeBadgeElem.textContent = "A+";
      gradeBadgeElem.className =
        "px-3 py-1 bg-emerald-100 text-[#3E9B6B] font-extrabold text-lg rounded-full";
      gradeDescElem.textContent =
        "Sangat Luar Biasa! Kamu adalah Health Master!";
    } else if (percentage >= 50) {
      gradeBadgeElem.textContent = "A";
      gradeBadgeElem.className =
        "px-3 py-1 bg-emerald-50 text-[#3E9B6B] font-extrabold text-lg rounded-full";
      gradeDescElem.textContent =
        "Performa bagus! Pertahankan terus rutinitasmu.";
    } else if (percentage >= 25) {
      gradeBadgeElem.textContent = "B";
      gradeBadgeElem.className =
        "px-3 py-1 bg-[#FDE4D5] text-[#F26B2E] font-extrabold text-lg rounded-full";
      gradeDescElem.textContent =
        "Awal yang baik! Ayo tambah EXP lagi hari ini.";
    } else {
      gradeBadgeElem.textContent = "C";
      gradeBadgeElem.className =
        "px-3 py-1 bg-gray-100 text-[#5B6168] font-extrabold text-lg rounded-full";
      gradeDescElem.textContent =
        "Mulai dengan menyelesaikan checklist pertama di atas.";
    }
  }

  // Load Saved State & Event Listeners
  checkboxes.forEach((cb) => {
    if (savedState[cb.id]) {
      cb.checked = true;
    }
    syncCheckboxStyles(cb);

    cb.addEventListener("change", (e) => {
      const target = e.target;
      savedState[target.id] = target.checked;

      localStorage.setItem(dateKey, JSON.stringify(savedState));
      syncCheckboxStyles(target);
      updateCalculations();
    });
  });

  // Initial Update
  updateCalculations(true);
});
