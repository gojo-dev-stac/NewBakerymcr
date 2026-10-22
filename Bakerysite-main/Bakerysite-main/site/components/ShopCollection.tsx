"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { basket, order } from "../cart";
import { gbp } from "../content";
import {
  shopCategories,
  shopProducts,
  type ShopCollectionSlug,
  type ShopProduct,
} from "../shop-products";

type SortMode = "featured" | "price-low" | "price-high" | "name";
type Filter = "All treats" | (typeof shopCategories)[number];

const collectionDetails: Record<
  ShopCollectionSlug,
  { label: string; title: string; description: string }
> = {
  all: {
    label: "The whole counter · Manchester",
    title: "A little of everything.",
    description:
      "Celebration cakes, box bakes and good things for the cupboard. Made in Manchester, ready for the table.",
  },
  "bespoke-cake": {
    label: "Bespoke cakes · Manchester",
    title: "Cakes for the big moments.",
    description:
      "Three cakes from the bakery’s bespoke collection, with the current descriptions, flavour choices and prices from the official listings.",
  },
  "tray-bakes": {
    label: "Tray bakes · Manchester",
    title: "A tray full of something lovely.",
    description:
      "Two freshly baked tray treats: a classic iced vanilla sponge and a Biscoff sponge finished with Biscoff sauce.",
  },
};

const collectionLinks: { slug: ShopCollectionSlug; label: string }[] = [
  { slug: "all", label: "All treats" },
  { slug: "bespoke-cake", label: "Bespoke cakes" },
  { slug: "tray-bakes", label: "Tray bakes" },
];

function ProductArtwork({ product }: { product: ShopProduct }) {
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = product.images[activeImage] ?? product.images[0];

  if (!currentImage) throw new Error(`No product photos available for ${product.handle}`);

  return (
    <div className="shop-product-gallery" aria-label={`Photos of ${product.name}`}>
      <div className={`shop-art shop-art--${product.kind}`}>
        <Image
          key={currentImage}
          className="shop-art-photo"
          src={currentImage}
          alt={`${product.name} from thebakerymcr`}
          fill
          sizes="(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 23vw"
        />
      </div>
      {product.images.length > 1 && (
        <div className="shop-art-thumbnails" role="group" aria-label={`${product.name} photos`}>
          {product.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`shop-art-thumb ${activeImage === index ? "is-active" : ""}`}
              aria-label={`Show photo ${index + 1} of ${product.name}`}
              aria-pressed={activeImage === index}
              onClick={() => setActiveImage(index)}
            >
              <Image src={image} alt="" fill sizes="52px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopCollection({ collection = "all" }: { collection?: ShopCollectionSlug }) {
  const [filter, setFilter] = useState<Filter>("All treats");
  const [sort, setSort] = useState<SortMode>("featured");
  const details = collectionDetails[collection];
  const collectionProducts = useMemo(
    () => shopProducts.filter((product) => product.collections.includes(collection)),
    [collection],
  );

  const products = useMemo(() => {
    const visible =
      filter === "All treats" || collection !== "all"
        ? [...collectionProducts]
        : collectionProducts.filter((product) => product.category === filter);

    if (sort === "price-low") visible.sort((a, b) => a.price - b.price);
    if (sort === "price-high") visible.sort((a, b) => b.price - a.price);
    if (sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name));
    return visible;
  }, [collection, collectionProducts, filter, sort]);

  const addProduct = (product: ShopProduct) => {
    order.add(product.name, product.price);
    basket.open();
  };

  return (
    <main id="top" className="shop-page">
      <section
        className="shop-intro container-x"
        data-record-label="shop-intro"
        data-record-time="0.8"
        aria-labelledby="shop-title"
      >
        <p className="label text-[color:var(--straw)]">{details.label}</p>
        <div className="shop-intro-row">
          <h1 id="shop-title" className="font-display">
            {details.title}
          </h1>
          <p>{details.description}</p>
        </div>
        <nav className="shop-collection-nav" aria-label="Shop collections">
          {collectionLinks.map((link) => (
            <a
              key={link.slug}
              href={`/collections/${link.slug}`}
              className={collection === link.slug ? "is-current" : ""}
              aria-current={collection === link.slug ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="shop-count">
          <span>
            {collectionProducts.length} {collectionProducts.length === 1 ? "product" : "products"}
          </span>
          <a href="/#counter" className="link-underline">
            Back to the bakery
          </a>
        </div>
      </section>

      <section
        className="shop-listing"
        data-record-label={`${collection}-products`}
        data-record-time="1.2"
        aria-label={details.label}
      >
        <div className="container-x">
          <div className="shop-controls">
            {collection === "all" ? (
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
            ) : (
              <p className="shop-controls-note">The bakery’s current collection</p>
            )}
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
            {filter !== "All treats" && collection === "all"
              ? ` · ${filter}`
              : " · freshly made, ready to find"}
          </p>

          <div className="shop-product-grid">
            {products.map((product, index) => {
              const priceLabel =
                product.price === product.maxPrice
                  ? gbp(product.price)
                  : `From ${gbp(product.price)}`;

              return (
                <article className="shop-product" key={product.handle}>
                  <ProductArtwork product={product} />
                  <div className="shop-product-info">
                    <div className="shop-product-meta">
                      <span>{product.category}</span>
                      <span>№ {String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h2>{product.name}</h2>
                    <p className="shop-product-description">{product.description}</p>
                    {product.variantOptions.length > 0 && (
                      <p className="shop-product-options">
                        <span>{product.variantOptions.length > 1 ? "Options" : "Option"}</span>
                        {product.variantOptions.join(" · ")}
                      </p>
                    )}
                    <div className="shop-product-buy">
                      <p>{priceLabel}</p>
                      <div className="shop-product-actions">
                        <button
                          type="button"
                          onClick={() => addProduct(product)}
                          aria-label={`Order ${product.name} for ${priceLabel} in your basket`}
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
