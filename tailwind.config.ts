import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import svgToDataUri from "mini-svg-data-uri";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)"],
      },
      boxShadow: {
        "i-tl-lg": "inset 15px 30px 60px -25px rgba(125, 125, 125, 0.15)",
        "i-br-lg": "inset -10px -30px 60px -10px rgba(125, 125, 125, 0.15)",
        // Case light
        "i-br-li": "inset -15px -30px 40px -20px rgba(125, 125, 125, 0.65)",
        "i-tl-li-hv": "inset 20px 20px 60px -30px rgba(125, 125, 125, 0.75)",
        // Case dark
        "i-br-dk": "inset -15px -30px 40px -30px rgba(255, 255, 255, 0.50)",
        "i-tl-dk-hv": "inset 25px 15px 60px -30px rgba(225, 225, 225, 0.8)",
        // Light
        "i-tl-li": "inset 20px 20px 20px -15px rgba(125, 125, 125, 0.55)",
        "i-br-li-hv": "inset -20px -20px 40px -30px rgba(125, 125, 125, 0.7)",
        // Dark
        "i-tl-dk": "inset 15px 15px 40px -30px rgba(255, 255, 255, 0.25)",
        "i-br-dk-hv": "inset -20px -20px 40px -30px rgba(255, 255, 255, 0.45)",
        // Meter
        "i-br-md-m": "inset -15px -30px 40px -20px rgba(175, 175, 175, 0.8)",
      },
      colors: {
        paper: "#F8F8F8",
        ash: "#D7D7D7",
        clay: "#6A6A6A",
        coal: "#3A3A3A",
        fast: "#172554",
        void: "#0F172A",
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
        "4000": "4000ms",
        "5000": "5000ms",
        "60000": "60000ms",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      animation: {
        shimmer: "shimmer 5s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    },
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
