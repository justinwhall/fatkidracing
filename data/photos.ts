export type Photo = {
  readonly blurb: string;
  readonly digitalPriceCents: number;
  readonly fromPriceCents: number;
  readonly id: string;
  readonly imageSrc: string;
  readonly title: string;
};

export type PrintMenuItem = {
  readonly priceCents: number;
  readonly size: string;
};

export type PhotoPrintMenu = {
  readonly digital: {
    readonly commercialFloorCents: number;
    readonly personalPriceCents: number;
    readonly printYourselfPriceCents: number;
  };
  readonly lustre: readonly PrintMenuItem[];
  readonly metal: readonly PrintMenuItem[];
};

export const PHOTO_PRINT_MENU: PhotoPrintMenu = {
  digital: {
    commercialFloorCents: 20000,
    personalPriceCents: 4000,
    printYourselfPriceCents: 6500,
  },
  lustre: [
    { priceCents: 3500, size: "8×10" },
    { priceCents: 5500, size: "11×14" },
    { priceCents: 9500, size: "16×20" },
    { priceCents: 17500, size: "24×36" },
  ],
  metal: [
    { priceCents: 7500, size: "8×10" },
    { priceCents: 12500, size: "11×14" },
    { priceCents: 19500, size: "16×20" },
  ],
};

export const PHOTOS: readonly Photo[] = [
  {
    blurb: "Summer lift towers waiting for winter to make them useful again.",
    digitalPriceCents: PHOTO_PRINT_MENU.digital.personalPriceCents,
    fromPriceCents: PHOTO_PRINT_MENU.lustre[0]?.priceCents ?? 3500,
    id: "last-chair",
    imageSrc: "/photos/last-chair.jpg",
    title: "Last Chair, Eventually",
  },
  {
    blurb: "Crested Butte got dressed for winter before the aspens got the memo.",
    digitalPriceCents: PHOTO_PRINT_MENU.digital.personalPriceCents,
    fromPriceCents: PHOTO_PRINT_MENU.lustre[0]?.priceCents ?? 3500,
    id: "first-snow",
    imageSrc: "/photos/first-snow.jpg",
    title: "Winter Sent a Warning",
  },
  {
    blurb: "Mt. Crested Butte dressed like it has somewhere better to be.",
    digitalPriceCents: PHOTO_PRINT_MENU.digital.personalPriceCents,
    fromPriceCents: PHOTO_PRINT_MENU.lustre[0]?.priceCents ?? 3500,
    id: "peak-leaf-season",
    imageSrc: "/photos/peak-leaf-season.jpg",
    title: "Peak Leaf Season, No Reservation",
  },
  {
    blurb: "Aspen singletrack: gorgeous, narrow, and allergic to bad line choice.",
    digitalPriceCents: PHOTO_PRINT_MENU.digital.personalPriceCents,
    fromPriceCents: PHOTO_PRINT_MENU.lustre[0]?.priceCents ?? 3500,
    id: "aspen-singletrack",
    imageSrc: "/photos/aspen-singletrack.jpg",
    title: "Leaf Peeping at Race Pace",
  },
];

export function getPhotoById(id: string | null | undefined): Photo | undefined {
  return PHOTOS.find((photo) => photo.id === id);
}

function formatWholeDollarPrice(priceCents: number): string {
  return `$${priceCents / 100}`;
}

export function createPhotoInquiryMessage(photo: Photo): string {
  const lustreMenu = PHOTO_PRINT_MENU.lustre
    .map(
      (item, index) =>
        `${item.size}${index === 0 ? " lustre" : ""} ${formatWholeDollarPrice(item.priceCents)}`,
    )
    .join(" / ");

  return [
    `I want "${photo.title}".`,
    "",
    lustreMenu,
    `Metal upgrade: ${PHOTO_PRINT_MENU.metal.map((item) => `${item.size} ${formatWholeDollarPrice(item.priceCents)}`).join(" / ")}`,
    `Digital: personal ${formatWholeDollarPrice(PHOTO_PRINT_MENU.digital.personalPriceCents)} / print-yourself ${formatWholeDollarPrice(PHOTO_PRINT_MENU.digital.printYourselfPriceCents)}`,
    "",
    "I am interested in:",
  ].join("\n");
}
