document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#food-image");
  const dropZone = document.querySelector("#drop-zone");
  const prompt = document.querySelector("#upload-prompt");
  const previewWrap = document.querySelector("#preview-wrap");
  const preview = document.querySelector("#image-preview");
  const fileName = document.querySelector("#file-name");
  const analyzeButton = document.querySelector("#analyze-button");
  const resetButton = document.querySelector("#reset-button");

  const uploadCard = document.querySelector("#upload-card");
  const resultCard = document.querySelector("#result-card");

  const statusMessage = document.querySelector("#status-message");
  const sugarBadge = document.querySelector("#sugar-badge");
  const nutritionList = document.querySelector("#nutrition-list");
  const recommendationList = document.querySelector("#recommendation-list");
  const historyList = document.querySelector("#history-list");
  const scannerLine = document.querySelector("#scanner-line");
  const scannerGlow = document.querySelector("#scanner-glow");

  let selectedFile = null;
  let scanAnimation = null;

  const recommendations = [
    ["Apel", "Rendah gula, tinggi serat"],
    ["Timun", "Menyegarkan dan rendah kalori"],
    ["Brokoli", "Kaya serat dan vitamin"],
    ["Pir", "Membantu rasa kenyang lebih lama"],
    ["Wortel", "Sumber beta-karoten yang baik"],
  ];

  function selectFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      statusMessage.textContent = "Pilih file gambar yang valid.";
      return;
    }
    selectedFile = file;
    preview.src = URL.createObjectURL(file);
    fileName.textContent =
      file.name.length > 24 ? file.name.slice(0, 21) + "..." : file.name;
    prompt.classList.add("hidden");
    previewWrap.classList.remove("hidden");
    analyzeButton.disabled = false;
    statusMessage.textContent = "Foto siap dianalisis.";
  }

  input.addEventListener("change", (e) => selectFile(e.target.files[0]));

  ["dragenter", "dragover"].forEach((event) => {
    dropZone.addEventListener(event, (e) => {
      e.preventDefault();
      dropZone.classList.add("border-[#F26B2E]", "bg-[#FDE4D5]/20");
    });
  });

  ["dragleave", "drop"].forEach((event) => {
    dropZone.addEventListener(event, (e) => {
      e.preventDefault();
      dropZone.classList.remove("border-[#F26B2E]", "bg-[#FDE4D5]/20");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files[0];
    if (file) selectFile(file);
  });

  function startScanning() {
    scannerLine.classList.remove("opacity-0");
    scannerGlow.classList.remove("opacity-0");
    let topPos = 8;
    let direction = 1;

    scanAnimation = setInterval(() => {
      topPos += direction * 2;
      if (topPos >= 90 || topPos <= 8) direction *= -1;
      scannerLine.style.top = topPos + "%";
    }, 20);
  }

  function stopScanning() {
    clearInterval(scanAnimation);
    scannerLine.classList.add("opacity-0");
    scannerGlow.classList.add("opacity-0");
  }

  analyzeButton.addEventListener("click", () => {
    if (!selectedFile) return;

    statusMessage.textContent = "Sedang menganalisis...";
    analyzeButton.disabled = true;
    startScanning();

    setTimeout(() => {
      stopScanning();

      // DUMMY RESULT DATA
      const sugarLevels = [
        { label: "Rendah Gula", bg: "bg-[#3E9B6B]/15", text: "text-[#3E9B6B]" },
        { label: "Gula Sedang", bg: "bg-[#F4B740]/15", text: "text-[#D98200]" },
        { label: "Tinggi Gula", bg: "bg-[#E2574C]/15", text: "text-[#E2574C]" },
      ];
      const randomSugar =
        sugarLevels[Math.floor(Math.random() * sugarLevels.length)];

      sugarBadge.textContent = randomSugar.label;
      sugarBadge.className = `rounded-full px-3 py-1.5 text-xs font-bold ${randomSugar.bg} ${randomSugar.text}`;

      const dummyNutrients = [
        { name: "Karbohidrat", amount: "35g", percent: 65 },
        { name: "Protein", amount: "12g", percent: 40 },
        { name: "Lemak", amount: "8g", percent: 25 },
        { name: "Serat", amount: "5g", percent: 20 },
      ];

      nutritionList.innerHTML = dummyNutrients
        .map(
          (item) => `
        <div>
          <div class="flex justify-between text-xs font-semibold mb-1">
            <dt class="text-[#1B1D1F]">${item.name}</dt>
            <dd class="text-[#5B6168]">${item.amount}</dd>
          </div>
          <div class="h-2 w-full rounded-full bg-[#E7E4DD] overflow-hidden">
            <div class="h-full rounded-full bg-[#F26B2E]" style="width: ${item.percent}%"></div>
          </div>
        </div>
      `,
        )
        .join("");

      const shuffledRecs = [...recommendations]
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      recommendationList.innerHTML = shuffledRecs
        .map(
          ([title, desc]) => `
        <div class="rounded-xl border border-[#E7E4DD] p-3 bg-[#FAF9F6]">
          <h4 class="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#1B1D1F]">${title}</h4>
          <p class="mt-0.5 text-[11px] text-[#5B6168]">${desc}</p>
        </div>
      `,
        )
        .join("");

      const li = document.createElement("li");
      li.className =
        "flex items-center justify-between border-b border-[#E7E4DD] pb-1.5";
      li.innerHTML = `<span>${selectedFile.name}</span> <span class="text-[10px] text-[#5B6168]">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>`;
      historyList.prepend(li);

      // SWAP VIEW: Sembunyikan Upload Card, Tampilkan Result Card
      uploadCard.classList.add("hidden");
      resultCard.classList.remove("hidden");
    }, 1500);
  });

  // Tombol Kembali Ke Upload
  resetButton.addEventListener("click", () => {
    selectedFile = null;
    input.value = "";
    prompt.classList.remove("hidden");
    previewWrap.classList.add("hidden");
    analyzeButton.disabled = true;
    statusMessage.textContent = "Belum ada foto yang dipilih.";

    // SWAP VIEW: Tampilkan Kembali Upload Card
    resultCard.classList.add("hidden");
    uploadCard.classList.remove("hidden");
  });
});
