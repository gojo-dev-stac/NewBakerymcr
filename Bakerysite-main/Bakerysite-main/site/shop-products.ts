export type ShopProductKind = "cake" | "box" | "brownie" | "bake" | "pantry" | "gift";
export type ShopCategory =
  | "Celebration cakes"
  | "Cake boxes"
  | "Cookies & brownies"
  | "Cupcakes & tray bakes"
  | "Pantry & gifts";

export type ShopProduct = {
  name: string;
  price: number;
  category: ShopCategory;
  kind: ShopProductKind;
  image?: string;
};

const image = (file: string) => `/images/crumb/${file}`;

export const shopProducts: ShopProduct[] = [
  { name: "8 Inch Pink Heart Cake", price: 85, category: "Celebration cakes", kind: "cake", image: image("cake-strawberry.webp") },
  { name: "Pink Bento Piped Cake", price: 40, category: "Celebration cakes", kind: "cake", image: image("cake-vanilla.webp") },
  { name: "Purple Piped Bento Cake", price: 40, category: "Celebration cakes", kind: "cake", image: image("cake-pistachio.webp") },
  { name: "Red Velvet Cake", price: 9, category: "Celebration cakes", kind: "cake", image: image("cake-crown.webp") },
  { name: "Valentines Cake", price: 18, category: "Celebration cakes", kind: "cake", image: image("cake-strawberry.webp") },
  { name: "Whole Rainbow Cake", price: 100, category: "Celebration cakes", kind: "cake", image: image("cake-crown.webp") },

  { name: "Birthday Cake Box Of 4", price: 25, category: "Cake boxes", kind: "box" },
  { name: "Birthday Cake Box Of 6", price: 32, category: "Cake boxes", kind: "box" },
  { name: "Biscoff & Oreo Cake Mixed Box Of 4", price: 24, category: "Cake boxes", kind: "box" },
  { name: "Biscoff & Oreo Cake Mixed Box Of 6", price: 24, category: "Cake boxes", kind: "box" },
  { name: "Biscoff Chocolate Sponge & Cornflake Tart Box Of 4", price: 21, category: "Cake boxes", kind: "box" },
  { name: "Chocolate Oreo Sponge Box Of 4", price: 18, category: "Cake boxes", kind: "box" },
  { name: "Chocolate Oreo Sponge Box Of 6", price: 30, category: "Cake boxes", kind: "box" },
  { name: "Jam Coconut Sponge Box Of 4", price: 18, category: "Cake boxes", kind: "box" },
  { name: "Jam Coconut Sponge Box Of 6", price: 30, category: "Cake boxes", kind: "box" },
  { name: "Old School Box Of 4", price: 24, category: "Cake boxes", kind: "box" },
  { name: "Old School Boxed Cake", price: 15, category: "Cake boxes", kind: "box" },
  { name: "Old School Cake Box Of 6", price: 32, category: "Cake boxes", kind: "box" },
  { name: "Oreo & Red Velvet Cake Box Of 4", price: 24, category: "Cake boxes", kind: "box" },
  { name: "Oreo & Red Velvet Cake Box Of 6", price: 32, category: "Cake boxes", kind: "box" },
  { name: "Pick Your Own Box", price: 35, category: "Cake boxes", kind: "box" },
  { name: "Red Velvet & Biscoff Mixed Cake Box Of 4", price: 24, category: "Cake boxes", kind: "box" },
  { name: "Red Velvet & Biscoff Mixed Cake Box Of 6", price: 32, category: "Cake boxes", kind: "box" },
  { name: "Red Velvet Box Of 6", price: 35, category: "Cake boxes", kind: "box" },
  { name: "Red-Velvet & Cornflake Tart Box Of 4", price: 20, category: "Cake boxes", kind: "box" },
  { name: "Red-Velvet Box Of 4", price: 24, category: "Cake boxes", kind: "box" },
  { name: "Vanilla Oreo Cake Box Of 4", price: 22, category: "Cake boxes", kind: "box" },
  { name: "Vanilla Oreo Cake Box Of 6", price: 32, category: "Cake boxes", kind: "box" },
  { name: "Victoria Sponge Cake Box Of 4", price: 24, category: "Cake boxes", kind: "box" },
  { name: "Victoria Sponge Cake Box Of 6", price: 32, category: "Cake boxes", kind: "box" },

  { name: "Biscoff Brownie & Cornflake Tart Box Of 4", price: 22, category: "Cookies & brownies", kind: "brownie" },
  { name: "Biscoff Brownie Box Of 4", price: 24, category: "Cookies & brownies", kind: "brownie" },
  { name: "Biscoff Brownie Box Of 6", price: 28, category: "Cookies & brownies", kind: "brownie" },
  { name: "Mixed Box Of 4 Cookies", price: 24, category: "Cookies & brownies", kind: "brownie" },
  { name: "Mixed Brownie Box", price: 30, category: "Cookies & brownies", kind: "brownie" },
  { name: "Mixed Brownie Box Of 4", price: 20, category: "Cookies & brownies", kind: "brownie" },
  { name: "Mixed Cookie Box", price: 35, category: "Cookies & brownies", kind: "brownie" },
  { name: "Oreo Brownie Box Of 4", price: 20, category: "Cookies & brownies", kind: "brownie" },
  { name: "Oreo Brownie Box Of 6", price: 28, category: "Cookies & brownies", kind: "brownie" },
  { name: "Valentines Brownie Box", price: 22, category: "Cookies & brownies", kind: "brownie" },

  { name: "Biscoff Vanilla Sponge Tray Bake", price: 5.49, category: "Cupcakes & tray bakes", kind: "bake" },
  { name: "Mixed Cupcake Box - 4 Or 8", price: 20, category: "Cupcakes & tray bakes", kind: "bake" },
  { name: "Old School Tray Bake", price: 5.49, category: "Cupcakes & tray bakes", kind: "bake" },
  { name: "Valentines Cupcake Box", price: 30, category: "Cupcakes & tray bakes", kind: "bake" },

  { name: "Chocolate Fudge Brownie Mix", price: 6.99, category: "Pantry & gifts", kind: "pantry" },
  { name: "Love Heart Balloon Huddle", price: 25, category: "Pantry & gifts", kind: "gift" },
  { name: "Pistachio Chocolate Bar", price: 10, category: "Pantry & gifts", kind: "pantry" },
  { name: "Pistachio Dubai Chocolate Bar", price: 10, category: "Pantry & gifts", kind: "pantry" },
  { name: "Vanilla Cake Mix", price: 9, category: "Pantry & gifts", kind: "pantry" },
];

export const shopCategories: ShopCategory[] = [
  "Celebration cakes",
  "Cake boxes",
  "Cookies & brownies",
  "Cupcakes & tray bakes",
  "Pantry & gifts",
];
