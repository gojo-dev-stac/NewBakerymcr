import Image from "next/image";
import { shopProducts } from "../shop-products";
import { gbp } from "../content";

const featuredPicks = [
  { handle: "8-inch-pink-heart-cake", label: "For the celebration", collection: "Bespoke cakes" },
  { handle: "bisoff-brownie-box-of-6", label: "For the chocolate fans", collection: "Brownies" },
  { handle: "biscoff-tray-bake-copy", label: "A little afternoon treat", collection: "Tray bakes" },
];

export default function JustOrdered() {
  const picks = featuredPicks.map((pick) => {
    const product = shopProducts.find((item) => item.handle === pick.handle);
    if (!product) throw new Error(`Featured homepage product not found: ${pick.handle}`);
    return { ...pick, product };
  });

  return (
    <section
      id="orders"
      data-record-time="1.1"
      data-record-hold="1.2"
      data-record-label="treats"
      className="home-picks relative z-10 overflow-hidden bg-[var(--pist)] py-[clamp(64px,9vh,104px)]"
    >
      <div className="step-edge flip" style={{ ["--step-c" as string]: "var(--pist)" }} />
      <div className="container-x relative z-[1]">
        <div className="home-picks-heading">
          <div>
            <p className="label text-[color:var(--straw)]">From the bakery</p>
            <h2 className="font-display mt-3 text-[clamp(44px,5.4vw,82px)]">
              A little something for everyone.
            </h2>
          </div>
          <p className="home-picks-intro">
            Celebration cakes, chocolatey brownies and soft, nostalgic bakes. Start with a favourite.
          </p>
        </div>

        <div className="home-picks-grid">
          {picks.map(({ handle, label, collection, product }) => (
            <article className="home-pick" key={handle}>
              <a
                className="home-pick-photo"
                href="/collections/all"
                aria-label={`Browse ${product.name} in the shop`}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 31vw"
                />
              </a>
              <div className="home-pick-info">
                <p className="label text-muted">{label}</p>
                <div className="home-pick-title">
                  <h3 className="font-display">{product.name}</h3>
                  <span>{collection}</span>
                </div>
                <div className="home-pick-foot">
                  <span className="font-display">
                    {product.price === product.maxPrice ? gbp(product.price) : `From ${gbp(product.price)}`}
                  </span>
                  <a href="/collections/all" className="link-underline">
                    Browse treats
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
