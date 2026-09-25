import type { Product } from "@/lib/commerce/types";

export const PRODUCTS: readonly Product[] = [
  {
    blurb: "Die-cut reminder that your drivetrain is not a personality.",
    id: "sticker-chain-lube",
    kind: "sticker",
    name: "CHAIN LUBE YOURSELF",
    priceCents: 600,
    status: "coming_soon",
  },
  {
    blurb: "For the sprint to the gas station nachos.",
    id: "sticker-snacks",
    kind: "sticker",
    name: "I PEEL OUT FOR SNACKS",
    priceCents: 500,
    status: "coming_soon",
  },
  {
    blurb: "The only category we dominate. Participation trophies sold separately.",
    id: "tee-cat-6",
    kind: "tee",
    name: "CAT 6 WORLD CHAMP",
    priceCents: 3200,
    status: "sold_out",
  },
  {
    blurb: "Wind tunnel said no. We printed it anyway.",
    id: "tee-aero",
    kind: "tee",
    name: "AERODYNAMICALLY COMPROMISED",
    priceCents: 3400,
    status: "coming_soon",
  },
];
