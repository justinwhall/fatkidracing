import { describe, expect, it } from "vitest";

import {
  PHOTO_PRINT_MENU,
  PHOTOS,
  createPhotoInquiryMessage,
  getPhotoById,
} from "./photos";

describe("photo catalog", () => {
  it("contains the supplied photos with unique ids", () => {
    expect(PHOTOS).toHaveLength(4);
    expect(new Set(PHOTOS.map((photo) => photo.id)).size).toBe(PHOTOS.length);
  });

  it("uses watermarked public image paths and locked prices", () => {
    expect(
      PHOTOS.every(
        (photo) =>
          photo.imageSrc.startsWith("/photos/") &&
          photo.fromPriceCents === 3500 &&
          photo.digitalPriceCents === 4000,
      ),
    ).toBe(true);

    expect(PHOTO_PRINT_MENU.lustre).toEqual([
      { priceCents: 3500, size: "8×10" },
      { priceCents: 5500, size: "11×14" },
      { priceCents: 9500, size: "16×20" },
      { priceCents: 17500, size: "24×36" },
    ]);
  });

  it("resolves known ids and ignores unknown ids", () => {
    expect(getPhotoById("first-snow")?.title).toBe("Winter Sent a Warning");
    expect(getPhotoById("nope")).toBeUndefined();
    expect(getPhotoById(null)).toBeUndefined();
  });

  it("builds the locked print menu into an inquiry", () => {
    const photo = getPhotoById("first-snow");

    if (photo === undefined) {
      throw new Error("Expected first-snow in the photo catalog");
    }

    expect(createPhotoInquiryMessage(photo)).toContain(
      'I want "Winter Sent a Warning".',
    );
    expect(createPhotoInquiryMessage(photo)).toContain(
      "8×10 lustre $35 / 11×14 $55 / 16×20 $95 / 24×36 $175",
    );
    expect(createPhotoInquiryMessage(photo)).toContain(
      "Digital: personal $40 / print-yourself $65",
    );
  });
});
