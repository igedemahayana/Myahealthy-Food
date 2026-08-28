/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      // 1. SETUP FONT FAMILY
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "sans-serif"],
        heading: ['"Plus Jakarta Sans"', "sans-serif"],
      },

      // 2. SETUP COLOR PALETTE
      colors: {
        brand: {
          primary: "#F26B2E",
          hover: "#D95A22",
          soft: "#FDE4D5",
        },
        ink: {
          DEFAULT: "#1B1D1F", // Teks Judul (H1–H4)
          body: "#5B6168", // Body Gray (Teks Isi)
          muted: "#8B9096", // Muted Gray (Caption/Label)
        },
        surface: {
          main: "#FAF9F6", // Off-White
          alt: "#F3F1EC", // Section Alt
          card: "#FFFDFB", // Card Surface
          dark: "#1E2422", // Deep Charcoal Footer
          divider: "#E7E4DD", // Border/Divider
        },
        semantic: {
          green: "#3E9B6B", // Fresh Green (Sehat/Positif)
          red: "#E2574C", // Alert Red (Waspada)
          amber: "#F4B740", // Gold/Amber (Gamifikasi)
          blue: "#4C8FE0", // Sky Blue (Info)
        },
      },

      // 3. SETUP STATIC FONT SIZE (Body, Caption, Button)
      fontSize: {
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
        button: ["15px", { lineHeight: "1", fontWeight: "600" }],
        body: ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
      },
    },
  },

  // 4. SETUP RESPONSIVE TYPOGRAPHY UTILITIES (H1–H4 & Stats)
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        /* H1 (Hero) */
        ".display-h1": {
          fontSize: "30px",
          lineHeight: "1.2",
          fontWeight: "700",
          "@media (min-width: 768px)": {
            fontSize: "40px",
            lineHeight: "1.15",
          },
          "@media (min-width: 1280px)": {
            fontSize: "56px",
            lineHeight: "1.1",
          },
        },
        /* H2 (Section Title) */
        ".display-h2": {
          fontSize: "24px",
          lineHeight: "1.25",
          fontWeight: "700",
          "@media (min-width: 768px)": {
            fontSize: "32px",
            lineHeight: "1.2",
          },
          "@media (min-width: 1280px)": {
            fontSize: "40px",
            lineHeight: "1.15",
          },
        },
        /* H3 (Card/Sub Title) */
        ".display-h3": {
          fontSize: "20px",
          lineHeight: "1.3",
          fontWeight: "600",
          "@media (min-width: 768px)": {
            fontSize: "24px",
            lineHeight: "1.25",
          },
          "@media (min-width: 1280px)": {
            fontSize: "28px",
            lineHeight: "1.2",
          },
        },
        /* H4 (Small Title) */
        ".display-h4": {
          fontSize: "18px",
          lineHeight: "1.3",
          fontWeight: "600",
          "@media (min-width: 768px)": {
            fontSize: "20px",
          },
          "@media (min-width: 1280px)": {
            fontSize: "22px",
          },
        },
        /* Stats Number */
        ".display-stats": {
          fontSize: "28px",
          lineHeight: "1.15",
          fontWeight: "800",
          "@media (min-width: 768px)": {
            fontSize: "36px",
            lineHeight: "1.1",
          },
          "@media (min-width: 1280px)": {
            fontSize: "48px",
          },
        },
        /* Responsive Body Overrides */
        "@media (min-width: 768px)": {
          ".text-caption": { fontSize: "13px" },
          ".text-body": { fontSize: "16px" },
          ".text-body-lg": { fontSize: "17px" },
        },
        "@media (min-width: 1280px)": {
          ".text-caption": { fontSize: "14px" },
          ".text-button": { fontSize: "16px" },
          ".text-body-lg": { fontSize: "18px" },
        },
      });
    },
  ],
};
