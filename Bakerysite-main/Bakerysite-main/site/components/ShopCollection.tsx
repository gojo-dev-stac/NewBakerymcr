"use client";

import { useMemo, useState } from "react";
import { basket, order } from "../cart";
import { gbp } from "../content";
import { shopCategories, shopProducts, type ShopProduct, type ShopProductKind } from "../shop-products";

type SortMode = "featured" | "price-low" | "price-high" | "name";
type Filter = "All treats" | (typeof shopCategories)[number];

function ProductArtwork({ product }: { product: ShopProduct }) {
  const toppings = toppingsFor(product.name);

  return (
    <div className={`shop-art shop-art--${product.kind}`} aria-hidden="true">
      {product.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="shop-art-photo" src={product.image} alt="" />
      ) : (
        <span className="shop-art-object">
          <span className="shop-art-layer shop-art-layer--one" />
          <span className="shop-art-layer shop-art-layer--two" />
          <span className="shop-art-layer shop-art-layer--three" />
          <span className="shop-art-spark shop-art-spark--one" />
          <span className="shop-art-spark shop-art-spark--two" />
        </span>
      )}
      {!product.image &&
        toppings.map((file, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={file} className={`shop-art-topping shop-art-topping--${index + 1}`} src={`/images/crumb/${file}`} alt="" />
        ))}
      <span className="shop-art-caption">{artCaption[product.kind]}</span>
    </div>
  );
}

function toppingsFor(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("chocolate") || lower.includes("oreo") || lower.includes("brownie")) return ["top-6.webp", "top-3.webp"];
  if (lower.includes("pistachio")) return ["top-7.webp", "top-4.webp"];
  if (lower.includes("heart") || lower.includes("valentine") || lower.includes("velvet")) return ["top-1.webp", "top-8.webp"];
  if (lower.includes("biscoff")) return ["top-5.webp", "top-6.webp"];
  return ["top-3.webp", "top-8.webp"];
}

const artCaption: Record<ShopProductKind, string> = {
  cake: "Made by hand",
  box: "Baked in Manchester",
  brownie: "A little something",
  bake: "Fresh from the oven",
  pantry: "For the cupboard",
  gift: "Ready to give",
};

export default function ShopCollection() {
  const [filter, setFilter] = useState<Filter>("All treats");
  const [sort, setSort] = useState<SortMode>("featured");

  const products = useMemo(() => {
    const visible =
      filter === "All treats" ? [...shopProducts] : shopProducts.filter((product) => product.category === filter);

    if (sort === "price-low") visible.sort((a, b) => a.price - b.price);
    if (sort === "price-high") visible.sort((a, b) => b.price - a.price);
    if (sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
    return visible;
  }, [filter, sort]);

  const addProduct = (product: ShopProduct) => {
    order.add(product.name, product.price);
    basket.open();
  };

  return (
    <main id="top" className="shop-page">
      <section className="shop-intro container-x" data-record-label="shop-intro" data-record-time="0.8" aria-labelledby="shop-title">
        <p className="label text-[color:var(--straw)]">The whole counter · Manchester</p>
        <div className="shop-intro-row">
          <h1 id="shop-title" className="font-display">A little of everything.</h1>
          <p>
            Celebration cakes, box bakes and good things for the cupboard. Made in Manchester, ready for the
            table.
          </p>
        </div>
        <div className="shop-count">
          <span>{shopProducts.length} things from the counter</span>
          <a href="/#counter" className="link-underline">Back to the bakery</a>
        </div>
      </section>

      <section className="shop-listing" data-record-label="all-products" data-record-time="1.2" aria-label="Bakery products">
        <div className="container-x">
          <div className="shop-controls">
            <div className="shop-filters" role="group" aria-label="Filter products">
              {(["All treats", ...shopCategories] as Filter[]).map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`shop-filter ${filter === category ? "is-active" : ""}`}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category === "All treats" ? "Everything" : category}
                </button>
              ))}
            </div>
            <label className="shop-sort">
              <span>Sort</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
                <option value="featured">Featured</option>
                <option value="name">Name, A to Z</option>
                <option value="price-low">Price, low to high</option>
                <option value="price-high">Price, high to low</option>
              </select>
            </label>
          </div>

          <p className="shop-result-count" aria-live="polite">
            {products.length} {products.length === 1 ? "treat" : "treats"}
            {filter !== "All treats" ? ` · ${filter}` : " · freshly made, ready to find"}
          </p>

          <div className="shop-product-grid">
            {products.map((product, index) => (
              <article className="shop-product" key={product.name}>
                <ProductArtwork product={product} />
                <div className="shop-product-info">
                  <div className="shop-product-meta">
                    <span>{product.category}</span>
                    <span>№ {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h2>{product.name}</h2>
                  <div className="shop-product-buy">
                    <p>{gbp(product.price)}</p>
                    <button type="button" onClick={() => addProduct(product)} aria-label={`Add ${product.name} for ${gbp(product.price)} to basket`}>
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
