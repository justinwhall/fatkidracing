export type ProductKind = "sticker" | "tee";

export type ProductStatus = "coming_soon" | "sold_out";

export type Product = {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
  readonly priceCents: number;
  readonly status: ProductStatus;
  readonly kind: ProductKind;
  readonly shopifyHandle?: string;
};

export type CommerceProvider = {
  listProducts: () => Promise<readonly Product[]>;
};
