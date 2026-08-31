document.addEventListener("DOMContentLoaded", () => {
  // Data 6 Card Swap Options
  const swapItems = [
    {
      id: 1,
      cravings: "Boba / Minuman Manis",
      iconClass: "bx-cup",
      swapEat: "Infused Water atau Smoothies Buah Asli",
      swapDo: "Jalan Santai 15 Menit",
      desc: "Kurangi gula berlebih untuk menjaga tingkat energi tetap stabil.",
    },
    {
      id: 2,
      cravings: "Keripik / Camilan Asin",
      iconClass: "bx-cookie",
      swapEat: "Edamame Rebus atau Kacang Almond",
      swapDo: "Stretching Badan 10 Menit",
      desc: "Dapatkan sensasi renyah dan serat alami tanpa tinggi natrium.",
    },
    {
      id: 3,
      cravings: "Gorengan / Deep Fried",
      iconClass: "bx-burger-alt",
      swapEat: "Tahu / Tempe Air Fryer atau Kukus",
      swapDo: "Jalan Cepat 20 Menit",
      desc: "Kurangi asupan lemak jenuh dan bantu stamina harian.",
    },
    {
      id: 4,
      cravings: "Mie Instan",
      iconClass: "bx-bowl-hot",
      swapEat: "Mie Shirataki / Bihun Jagung + Sayur Alami",
      swapDo: "Minum 2 Gelas Air Putih",
      desc: "Tetap lezat dengan serat tinggi dan natrium lebih terkontrol.",
    },
    {
      id: 5,
      cravings: "Es Krim / Dessert Gula Tinggi",
      iconClass: "bx-cup-saucer",
      swapEat: "Yogurt Plain + Potongan Pisang / Beri",
      swapDo: "Relaksasi Pernapasan 5 Menit",
      desc: "Manis alami dari buah serta probiotik baik untuk pencernaan.",
    },
    {
      id: 6,
      cravings: "Kopi Susu Tinggi Sirup",
      iconClass: "bx-coffee-cup",
      swapEat: "Americano / Espresso + Susu Low-Fat",
      swapDo: "Push-up / Light Workout 5 Menit",
      desc: "Tetap fokus tanpa asupan kalori kosong dari sirup berlebih.",
    },
  ];

  const cardsGrid = document.getElementById("cardsGrid");
  if (!cardsGrid) return;

  cardsGrid.innerHTML = "";

  // Render 6 Cards
  swapItems.forEach((item) => {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "[perspective:1000px] h-64 cursor-pointer group";

    cardWrapper.innerHTML = `
      <div class="card-inner relative w-full h-full duration-500 [transform-style:preserve-3d] transition-transform">
        
        <!-- FRONT SIDE -->
        <div class="absolute inset-0 w-full h-full bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm [backface-visibility:hidden] group-hover:border-[#FF8C42]/50 transition">
          <div>
            <div class="w-10 h-10 rounded-xl bg-orange-50 text-[#FF8C42] flex items-center justify-center text-xl mb-4">
              <i class="bx ${item.iconClass}"></i>
            </div>
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Lagi Pengen</p>
            <h2 class="text-base font-bold text-[#111827] mt-1">${item.cravings}</h2>
          </div>
          
          <div class="flex items-center justify-between text-xs font-semibold text-[#FF8C42]">
            <span>Klik untuk tukar sehat</span>
            <i class="bx bx-refresh text-lg"></i>
          </div>
        </div>

        <!-- BACK SIDE (Warna BG #FF8C42 & Text White) -->
        <div class="absolute inset-0 w-full h-full bg-[#FF8C42] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div class="space-y-3">
            <div>
              <span class="inline-block px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded mb-1 border border-white/20">SARAN MAKAN</span>
              <p class="text-xs font-semibold text-white leading-snug">${item.swapEat}</p>
            </div>
            <div>
              <span class="inline-block px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded mb-1 border border-white/20">SARAN AKTIVITAS</span>
              <p class="text-xs font-semibold text-white leading-snug">${item.swapDo}</p>
            </div>
          </div>

          <div class="pt-2 border-t border-white/20 flex items-center justify-between">
            <p class="text-[10px] text-white/80 leading-tight">${item.desc}</p>
            <i class="bx bx-undo text-lg text-white"></i>
          </div>
        </div>

      </div>
    `;

    // Toggle Flip
    const innerCard = cardWrapper.querySelector(".card-inner");
    cardWrapper.addEventListener("click", () => {
      innerCard.classList.toggle("[transform:rotateY(180deg)]");
    });

    cardsGrid.appendChild(cardWrapper);
  });
});
