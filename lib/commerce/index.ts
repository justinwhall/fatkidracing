import { localCommerceProvider } from "./local-provider";

import type { CommerceProvider } from "./types";

export { formatPriceCents, shopCtaLabel } from "./money";
export type { CommerceProvider, Product, ProductKind, ProductStatus } from "./types";

export function getCommerceProvider(): CommerceProvider {
  return localCommerceProvider;
}
