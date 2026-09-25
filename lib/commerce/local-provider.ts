import { PRODUCTS } from "@/data/products";

import type { CommerceProvider } from "./types";

export const localCommerceProvider: CommerceProvider = {
  listProducts: () => Promise.resolve(PRODUCTS),
};
