import type { ProductStatus } from "./types";

export function formatPriceCents(priceCents: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(priceCents / 100);
}

export function shopCtaLabel(status: ProductStatus): string {
  switch (status) {
    case "coming_soon":
      return "COMING SOON";
    case "sold_out":
      return "SOLD OUT";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}
