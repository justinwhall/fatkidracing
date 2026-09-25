"use client";

import { createTheme } from "@mantine/core";

import type { MantineColorsTuple } from "@mantine/core";

const neon: MantineColorsTuple = [
  "#ffe6f4",
  "#ffc2e3",
  "#ff99d0",
  "#ff70bd",
  "#ff47aa",
  "#ff2d9b",
  "#e01682",
  "#b80f68",
  "#8f0b51",
  "#66083a",
];

const sunset: MantineColorsTuple = [
  "#fff1e6",
  "#ffd9b8",
  "#ffc08a",
  "#ffa85c",
  "#ff8f2e",
  "#ff7a1a",
  "#e6630d",
  "#cc4f08",
  "#a33d06",
  "#7a2d04",
];

const voltage: MantineColorsTuple = [
  "#f3e8ff",
  "#e0c8ff",
  "#c9a3ff",
  "#b17eff",
  "#9b5cff",
  "#8b5cff",
  "#6f3fd4",
  "#5830a8",
  "#41227c",
  "#2b1552",
];

export const theme = createTheme({
  autoContrast: true,
  black: "#07010c",
  colors: {
    neon,
    sunset,
    voltage,
  },
  components: {
    Badge: {
      defaultProps: {
        radius: 0,
      },
    },
    Button: {
      defaultProps: {
        radius: 0,
      },
    },
    Card: {
      defaultProps: {
        padding: "lg",
        radius: 0,
        withBorder: true,
      },
    },
  },
  cursorType: "pointer",
  defaultRadius: 0,
  fontFamily: "var(--font-body), sans-serif",
  headings: {
    fontFamily: "var(--font-display), sans-serif",
    fontWeight: "400",
  },
  primaryColor: "neon",
  primaryShade: 5,
  white: "#f8eaff",
});
