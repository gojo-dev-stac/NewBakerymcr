import productData from "./shop-products-data.json";

export type ShopProductKind = "cake" | "box" | "brownie" | "bake" | "pantry" | "gift";
export type ShopCategory =
  | "Celebration cakes"
  | "Cake boxes"
  | "Cookies & brownies"
  | "Cupcakes & tray bakes"
  | "Pantry & gifts";
export type ShopCollectionSlug = "all" | "bespoke-cake" | "tray-bakes";

export type ShopProduct = {
  name: string;
  handle: string;
  price: number;
  maxPrice: number;
  category: ShopCategory;
  kind: ShopProductKind;
  description: string;
  images: string[];
  variantOptions: string[];
  collections: ShopCollectionSlug[];
};

export const shopCategories: ShopCategory[] = [
  "Celebration cakes",
  "Cake boxes",
  "Cookies & brownies",
  "Cupcakes & tray bakes",
  "Pantry & gifts",
];

const categoryMap: Record<string, ShopCategory> = {
  "Celebration cakes": "Celebration cakes",
  "Cake boxes": "Cake boxes",
  "Cookies & brownies": "Cookies & brownies",
  "Cupcakes & tray bakes": "Cupcakes & tray bakes",
  "Pantry & gifts": "Pantry & gifts",
};
const kindMap: Record<string, ShopProductKind> = {
  cake: "cake",
  box: "box",
  brownie: "brownie",
  bake: "bake",
  pantry: "pantry",
  gift: "gift",
};
const collectionMap: Record<string, ShopCollectionSlug> = {
  all: "all",
  "bespoke-cake": "bespoke-cake",
  "tray-bakes": "tray-bakes",
};

function mapCatalogValue<T extends string>(value: string, values: Record<string, T>, field: string): T {
  const mapped = values[value];
  if (!mapped) throw new Error(`Unknown ${field} in shop catalogue: ${value}`);
  return mapped;
}

export const shopProducts: ShopProduct[] = productData.map((product) => ({
  ...product,
  category: mapCatalogValue(product.category, categoryMap, "category"),
  kind: mapCatalogValue(product.kind, kindMap, "kind"),
  collections: product.collections.map((collection) =>
    mapCatalogValue(collection, collectionMap, "collection"),
  ),
}));
