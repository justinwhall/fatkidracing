import { describe, expect, it } from "vitest";

import { getCommerceProvider } from "./index";

describe("local commerce provider", () => {
  it("lists four merch SKUs with no live checkout", async () => {
    const products = await getCommerceProvider().listProducts();
    const kinds = products.map((product) => product.kind);
    const stickerCount = kinds.filter((kind) => kind === "sticker").length;
    const teeCount = kinds.filter((kind) => kind === "tee").length;
    const ids = products.map((product) => product.id);

    expect(products).toHaveLength(4);
    expect(stickerCount).toBe(2);
    expect(teeCount).toBe(2);
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      products.every(
        (product) =>
          product.priceCents > 0 &&
          (product.status === "coming_soon" || product.status === "sold_out") &&
          product.shopifyHandle === undefined,
      ),
    ).toBe(true);
  });
});
