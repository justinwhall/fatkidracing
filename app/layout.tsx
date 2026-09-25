import "@mantine/core/styles.css";

import "./globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { Audiowide, Oswald } from "next/font/google";

import { theme } from "../theme";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const audiowide = Audiowide({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const oswald = Oswald({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  description:
    "Wraparound-shade energy. Party laps. Stickers and tees incoming.",
  icons: {
    icon: "/logo.png",
  },
  metadataBase: new URL("https://fatkidracing.party"),
  openGraph: {
    description:
      "Too big to aero. Too stubborn to DNF. Stickers and tees incoming.",
    images: ["/logo.png"],
    locale: "en_US",
    siteName: "Fatkid Racing",
    title: "Fatkid Racing",
    type: "website",
    url: "https://fatkidracing.party",
  },
  title: {
    default: "Fatkid Racing | fatkidracing.party",
    template: "%s | Fatkid Racing",
  },
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${audiowide.variable} ${oswald.variable}`}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider forceColorScheme="dark" theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
