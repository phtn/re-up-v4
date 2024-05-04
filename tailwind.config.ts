import { fontFamily } from "tailwindcss/defaultTheme";
import svgToDataUri from "mini-svg-data-uri";
import tailwindcssAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";
import { type Config } from "tailwindcss/types/config";

export type ColorValue = string | Record<string, string> | undefined;

/**
 * @name flattenColorPalette
 * @description Flattens a color palette (custom)
 */
export function flattenColorPalette(
  colors: Record<string, ColorValue>,
): Record<string, string> {
  const flattenColors: Record<string, string> = {};

  function flatten(colorName: string, colorValue: ColorValue) {
    if (typeof colorValue === "string") {
      flattenColors[colorName] = colorValue;
    } else {
      for (const key in colorValue) {
        flatten(`${colorName}-${key}`, colorValue[key]);
      }
    }
  }

  for (const colorName in colors) {
    flatten(colorName, colors[colorName]);
  }

  return flattenColors;
}

interface AddVars {
  addBase: (styles: Record<string, Record<string, string>>) => void;
  theme: (path: ColorValue) => Record<string, ColorValue>;
}

function addVariablesForColors({ addBase, theme }: AddVars) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default {
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./src/**/*.js",
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)"],
        k2d: ["var(--font-k2d)", "sans-serif"],
        jet: ["var(--font-jet)", "monospace"],
      }, //i-br-li-hv
      boxShadow: {
        "i-tl-lg": "inset 15px 30px 60px -25px rgba(125, 125, 125, 0.15)",
        "i-br-lg": "inset -10px -30px 60px -10px rgba(125, 125, 125, 0.15)",
        // Case light
        "i-br-li": "inset -15px -30px 40px -20px rgba(125, 125, 125, 0.65)",
        "i-tl-li-hv": "inset 20px 20px 60px -30px rgba(125, 125, 125, 0.75)",
        // Case dark
        "i-br-dk": "inset -15px -30px 40px -30px rgba(255, 255, 255, 0.60)",
        "i-tl-dk-hv": "inset 20px 15px 60px -20px rgba(180, 180, 180, 0.7)",
        // Light
        "i-tl-li": "inset 15px 20px 20px -15px rgba(150, 150, 150, 0.55)",
        "i-br-li-hv": "inset -15px -20px 40px -30px rgba(150, 150, 150, 0.65)",
        // Dark
        "i-tl-dk": "inset 15px 15px 40px -25px rgba(255, 255, 255, 0.35)",
        "i-br-dk-hv": "inset -20px -20px 40px -30px rgba(255, 255, 255, 0.45)",
        // Meter
        "i-br-md-m": "inset -15px -30px 40px -20px rgba(175, 175, 175, 0.8)",
        // Sign
        "i-tl-si": "inset 20px 20px 20px -15px rgba(50, 50, 50, 0.55)",
        "i-br-si": "inset -20px -20px 40px -30px rgba(50, 50, 50, 0.65)",
      },
      textColor: {
        title:
          "text-transparent bg-gradient-to-r from-orange-200 via-rose-100/80 via-[30%] to-sky-900 to-[90%] bg-clip-text",
        description:
          "bg-gradient-to-r from-sky-200/80 to-cyan-100/60 bg-clip-text text-transparent",
      },
      colors: {
        paper: "#F8F8F8",
        ash: "#D7D7D7",
        opus: "#929292",
        mojo: "#F2F2F2",
        darkmojo: "#E5E5E5",
        dyan: "#083344",
        bojo: "#CFEFFF",
        fgbojo: "#5DCCCC",
        mod: "#D3D9FA",
        fgmod: "#8698FF",
        clay: "#6A6A6A",
        coal: "#3A3A3A",
        fast: "#172554",
        void: "#000712",
        lux: "#ABBBB8",
        luz: "#0369a1",
        rome: "#CCD6D5",
        zap: "#FFFDF8",
        fire: "#fb923c",
        kindle: "#ffaa6f",
        cord: "#bae6fd",
        whb: "#51bfc9",
        fwhb: "#EBF3F0",
        whr: "#e03838",
        copper: "#13171F",
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
        shimmer: "shimmer 1s linear infinite",
        "shimmer-once": "shimmer 1s linear",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        rotate: {
          "0%": { transform: "rotateY(0deg) rotatex(0deg)" },
          "50%": { transform: "rotateY(180deg) rotatex(180deg)" },
          "100%": { transform: "rotateY(360deg) rotatex(360deg)" },
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(() => addVariablesForColors),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          "bg-grid-small": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          "bg-dot": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
            )}")`,
          }),
          "bg-dot-sm": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
            )}")`,
          }),
          "bg-dot-big": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    }),
  ],
} satisfies Config;
