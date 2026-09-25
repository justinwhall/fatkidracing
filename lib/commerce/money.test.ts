import { describe, expect, it } from "vitest";

import { formatPriceCents, shopCtaLabel } from "./money";

describe("formatPriceCents", () => {
  it("formats USD from cents", () => {
    expect(formatPriceCents(500)).toBe("$5.00");
    expect(formatPriceCents(3200)).toBe("$32.00");
  });
});

describe("shopCtaLabel", () => {
  it("labels coming soon and sold out", () => {
    expect(shopCtaLabel("coming_soon")).toBe("COMING SOON");
    expect(shopCtaLabel("sold_out")).toBe("SOLD OUT");
  });
});
