// Navbar
// / Generic dropdown handling (Layanan desktop, Notifikasi, Profile)
const dropdowns = document.querySelectorAll("[data-dropdown]");

function closeAllDropdowns(except) {
  dropdowns.forEach((el) => {
    if (el === except) return;
    const trigger = el.querySelector(".dropdown-trigger");
    const panel = el.querySelector(".dropdown-panel");
    const chevron = el.querySelector(".dropdown-chevron");
    panel.classList.add("hidden");
    trigger.setAttribute("aria-expanded", "false");
    if (chevron) chevron.classList.remove("rotate-180");
  });
}

dropdowns.forEach((el) => {
  const trigger = el.querySelector(".dropdown-trigger");
  const panel = el.querySelector(".dropdown-panel");
  const chevron = el.querySelector(".dropdown-chevron");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !panel.classList.contains("hidden");
    closeAllDropdowns(el);
    panel.classList.toggle("hidden", isOpen);
    trigger.setAttribute("aria-expanded", String(!isOpen));
    if (chevron) chevron.classList.toggle("rotate-180", !isOpen);
  });
});

document.addEventListener("click", () => closeAllDropdowns());
document.querySelectorAll(".dropdown-panel").forEach((panel) => {
  panel.addEventListener("click", (e) => e.stopPropagation());
});

// Mobile hamburger menu
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const iconMenu = document.getElementById("icon-menu");
const iconClose = document.getElementById("icon-close");

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden", isOpen);
  mobileMenuBtn.setAttribute("aria-expanded", String(!isOpen));
  iconMenu.classList.toggle("hidden", !isOpen);
  iconClose.classList.toggle("hidden", isOpen);
  if (!isOpen) closeAllDropdowns();
});

// Mobile "Layanan" accordion
const mobileLayananBtn = document.getElementById("mobile-layanan-btn");
const mobileLayananPanel = document.getElementById("mobile-layanan-panel");
const mobileLayananChevron = document.getElementById("mobile-layanan-chevron");

mobileLayananBtn.addEventListener("click", () => {
  const isOpen = !mobileLayananPanel.classList.contains("hidden");
  mobileLayananPanel.classList.toggle("hidden", isOpen);
  mobileLayananBtn.setAttribute("aria-expanded", String(!isOpen));
  mobileLayananChevron.classList.toggle("rotate-180", !isOpen);
});
