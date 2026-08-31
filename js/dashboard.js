document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  // Format tanggal singkat untuk header list
  const dateOptions = { day: "numeric", month: "short" };
  const formattedDate = today.toLocaleDateString("id-ID", dateOptions);
  document.getElementById("current-date-badge").textContent = formattedDate;

  // Key LocalStorage
  const dateKey = `myahealth_tracker_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const monthlyKey = `myahealth_monthly_exp_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  const savedState = JSON.parse(localStorage.getItem(dateKey)) || {};
  const baseMonthlyExp = parseInt(localStorage.getItem(monthlyKey) || "0", 10);

  // Master Data Misi Harian
  const masterTasks = [
    { id: "task-1", title: "Makan 1 Porsi Buah", exp: 20 },
    { id: "task-2", title: "Minum Air 8 Gelas", exp: 15 },
    { id: "task-3", title: "Makan Sayur Segar", exp: 20 },
    { id: "task-4", title: "Jalan Kaki 15 Menit", exp: 15 },
    { id: "task-5", title: "Tidur Sebelum Jam 11", exp: 10 },
  ];

  let dailyExp = 0;
  let completedCount = 0;

  const taskListElem = document.getElementById("dashboard-task-list");
  taskListElem.innerHTML = "";

  // Render Clean Task List Item
  masterTasks.forEach((task) => {
    const isCompleted = savedState[task.id] || false;
    if (isCompleted) {
      dailyExp += task.exp;
      completedCount++;
    }

    const li = document.createElement("li");
    li.className = `flex items-center justify-between text-xs px-3.5 py-2.5 rounded-xl border transition-all ${
      isCompleted
        ? "bg-gray-50/50 border-gray-100 text-gray-400"
        : "bg-white border-gray-100 text-[#111827]"
    }`;

    li.innerHTML = `
      <div class="flex items-center gap-2.5">
        <div class="w-4 h-4 rounded-full flex items-center justify-center border ${
          isCompleted
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-gray-200"
        }">
          ${isCompleted ? '<i class="bx bx-check text-xs"></i>' : ""}
        </div>
        <span class="${isCompleted ? "line-through" : "font-medium"}">${task.title}</span>
      </div>
      <span class="text-[10px] font-semibold text-gray-400">+${task.exp} EXP</span>
    `;

    taskListElem.appendChild(li);
  });

  // Update Data Ringkasan
  const totalMonthlyExp = baseMonthlyExp + dailyExp;
  document.getElementById("dash-total-exp").textContent =
    `${totalMonthlyExp} EXP`;
  document.getElementById("dash-tasks-count").textContent = completedCount;

  // Grade State Handler
  const gradeLabel = document.getElementById("dash-grade-label");
  const gradeBadge = document.getElementById("dash-grade-badge");
  const percentage = Math.min(Math.round((totalMonthlyExp / 3000) * 100), 100);

  if (percentage >= 80) {
    gradeBadge.textContent = "A+";
    gradeBadge.className =
      "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center text-sm";
    gradeLabel.textContent = "Health Master";
  } else if (percentage >= 50) {
    gradeBadge.textContent = "A";
    gradeBadge.className =
      "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center text-sm";
    gradeLabel.textContent = "Sangat Baik";
  } else if (percentage >= 25) {
    gradeBadge.textContent = "B";
    gradeBadge.className =
      "w-10 h-10 rounded-xl bg-orange-50 text-[#F26B2E] font-extrabold flex items-center justify-center text-sm";
    gradeLabel.textContent = "Good Progress";
  } else {
    gradeBadge.textContent = "C";
    gradeBadge.className =
      "w-10 h-10 rounded-xl bg-gray-100 text-gray-500 font-extrabold flex items-center justify-center text-sm";
    gradeLabel.textContent = "Perlu Ditingkatkan";
  }

  // Clean Config Chart.js
  const ctx = document.getElementById("weeklyChart").getContext("2d");

  // Gradient Fill halus untuk Bar/Area Chart
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, "rgba(242, 107, 46, 0.85)");
  gradient.addColorStop(1, "rgba(242, 107, 46, 0.15)");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Ming"],
      datasets: [
        {
          label: "EXP Hari Ini",
          data: [40, 60, 75, 50, 80, 65, dailyExp],
          backgroundColor: gradient,
          borderRadius: 6,
          borderSkipped: false,
          barThickness: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#111827",
          padding: 10,
          titleFont: { family: "Inter", size: 11 },
          bodyFont: { family: "Inter", size: 11 },
          cornerRadius: 8,
          displayColors: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 80,
          grid: {
            color: "#F3F4F6",
            drawBorder: false,
          },
          ticks: {
            font: { family: "Inter", size: 10 },
            color: "#9CA3AF",
            stepSize: 20,
          },
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "Inter", size: 10 },
            color: "#9CA3AF",
          },
        },
      },
    },
  });
});
