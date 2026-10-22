"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { basket, order, type BasketLine } from "../cart";
import { gbp } from "../content";

// The basket collects order details locally and shows a confirmation preview; it does not submit orders or payments.
type Placed = {
  ref: string;
  lines: BasketLine[];
  total: number;
  fulfil: "collect" | "post";
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function Basket() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<BasketLine[]>([]);
  const [fulfil, setFulfil] = useState<"collect" | "post">("collect");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [placed, setPlaced] = useState<Placed | null>(null);

  useEffect(() => basket.subscribe(setOpen), []);
  // a route change closes the drawer (there is nowhere to keep an order across pages)
  useEffect(() => {
    basket.close();
  }, [pathname]);
  useEffect(
    () =>
      order.subscribe((_, added, l) => {
        setLines(l ?? []);
      }),
    [],
  );

  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const items = lines.reduce((n, l) => n + l.qty, 0);
  const needsAddress = fulfil === "post";
  const ready =
    name.trim().length > 1 &&
    /.+@.+\..+/.test(email) &&
    phone.trim().length > 4 &&
    (!needsAddress || (addressLine1.trim().length > 0 && city.trim().length > 0 && postcode.trim().length > 0));

  const close = () => {
    basket.close();
    window.setTimeout(() => {
      setPlaced(null);
      setName("");
      setEmail("");
      setPhone("");
      setAddressLine1("");
      setAddressLine2("");
      setCity("");
      setPostcode("");
    }, 500);
  };

  const place = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ready || lines.length === 0) return;
    setPlaced({
      ref: `MCR-${1400 + Math.floor(Math.random() * 500)}`,
      lines,
      total,
      fulfil,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address:
        fulfil === "post"
          ? [addressLine1, addressLine2, city, postcode]
              .map((part) => part.trim())
              .filter(Boolean)
              .join(", ")
          : "",
    });
    order.clear();
  };

  return (
    <>
      <div className={`basket-scrim ${open ? "is-open" : ""}`} onClick={close} aria-hidden={!open} />

      <aside
        className={`basket-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your basket"
        aria-hidden={!open}
      >
        <div className="basket-head">
          <div className="flex items-center justify-between gap-4">
            <p className="label text-[color:var(--straw)]">thebakerymcr · order</p>
            <button
              type="button"
              className="basket-x"
              onClick={close}
              aria-label="Close the basket"
              data-cursor="Close"
            >
              <span aria-hidden>✕</span>
            </button>
          </div>
          <h2 className="font-display mt-3 text-[clamp(30px,3vw,40px)] leading-none">
            {placed ? "Order details." : "Your basket"}
          </h2>
          <p className="mt-2 text-[13px] text-muted">
            {placed ? placed.ref : items > 0 ? `${items} ${items === 1 ? "item" : "items"} · ${gbp(total)}` : "Nothing added yet"}
          </p>
          <span aria-hidden className="basket-rule" />
        </div>

        <div className="basket-body" data-lenis-prevent>
          {placed ? (
            <div className="basket-done">
              <p className="text-[15px] leading-[1.6]">
                Your order details are ready, {placed.name}. They have not been sent and no payment has been taken.
              </p>
              <div className="basket-slip">
                {placed.lines.map((l) => (
                  <p key={`${l.name}|${l.price}`} className="basket-slip-row">
                    <span className="min-w-0 truncate">
                      {l.name}
                      {l.qty > 1 ? ` × ${l.qty}` : ""}
                    </span>
                    <span className="tabular-nums">{gbp(l.price * l.qty)}</span>
                  </p>
                ))}
                <p className="basket-slip-row basket-slip-total">
                  <span>Total</span>
                  <span className="tabular-nums">{gbp(placed.total)}</span>
                </p>
              </div>
              <div className="basket-slip">
                <p className="basket-slip-row">
                  <span>Name</span>
                  <span className="text-right">{placed.name}</span>
                </p>
                <p className="basket-slip-row">
                  <span>Email</span>
                  <span className="text-right">{placed.email}</span>
                </p>
                <p className="basket-slip-row">
                  <span>Phone</span>
                  <span className="text-right">{placed.phone}</span>
                </p>
                {placed.address && (
                  <p className="basket-slip-row">
                    <span>Delivery address</span>
                    <span className="text-right">{placed.address}</span>
                  </p>
                )}
              </div>
              <p className="label text-[color:var(--straw)]">
                {placed.fulfil === "collect" ? "Collection selected" : "Postal delivery selected"}
              </p>
              <p className="text-[13px] leading-snug text-muted">
                {placed.fulfil === "collect"
                  ? "Contact the bakery to confirm collection details and availability."
                  : "Contact the bakery to confirm postal availability and delivery timing."}
              </p>
              <button type="button" className="btn btn-solid w-full" onClick={close} data-cursor="Done">
                Done
              </button>
              <p className="text-[12px] leading-snug text-muted">
                This site is not connected to the bakery’s ordering or payment system yet, so this confirmation is only shown here.
              </p>
            </div>
          ) : lines.length === 0 ? (
            <div className="basket-empty">
              <p className="font-display text-[26px] leading-tight">Nothing in yet.</p>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted">
                Add a cake from the counter or build your own — everything you add turns up here, ready to order.
              </p>
              <a
                href={pathname === "/collections/all" ? "/#counter" : "#counter"}
                className="btn btn-outline mt-5"
                onClick={() => basket.close()}
                data-cursor="Shop"
              >
                Start at the counter
              </a>
            </div>
          ) : (
            <>
              <ul className="basket-lines">
                {lines.map((l) => (
                  <li key={`${l.name}|${l.price}`} className="basket-row">
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold leading-tight">{l.name}</p>
                      <p className="mt-0.5 text-[13px] tabular-nums text-muted">{gbp(l.price)} each</p>
                      <button
                        type="button"
                        className="basket-rm"
                        onClick={() => order.setQty(l.name, l.price, 0)}
                        data-cursor="Remove"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-[20px] leading-none tabular-nums">{gbp(l.price * l.qty)}</p>
                      <div className="basket-qty mt-2">
                        <button
                          type="button"
                          onClick={() => order.setQty(l.name, l.price, l.qty - 1)}
                          aria-label={`One less ${l.name}`}
                        >
                          −
                        </button>
                        <span className="tabular-nums">{l.qty}</span>
                        <button
                          type="button"
                          onClick={() => order.setQty(l.name, l.price, l.qty + 1)}
                          aria-label={`One more ${l.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="basket-sub">
                <span className="label text-muted">Subtotal</span>
                <span className="font-display text-[clamp(28px,3vw,36px)] leading-none tabular-nums">{gbp(total)}</span>
              </p>

              <form
                className="basket-form"
                onSubmit={place}
                aria-label="Order details"
              >
                <p className="label text-muted">How would you like it?</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["collect", "post"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={fulfil === v}
                      onClick={() => setFulfil(v)}
                      className="chip border-[1.5px] border-[var(--choc)] px-3.5 py-2 text-[14px] font-medium aria-pressed:bg-[var(--choc)] aria-pressed:text-[var(--paper)]"
                      data-cursor="Pick"
                    >
                      {v === "collect" ? "Collection" : "Postal delivery"}
                    </button>
                  ))}
                </div>

                <label className="mt-5 block">
                  <span className="label block text-muted">Your name</span>
                  <input
                    className="basket-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amara Khan"
                    autoComplete="name"
                  />
                </label>
                <label className="mt-4 block">
                  <span className="label block text-muted">Email</span>
                  <input
                    className="basket-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>
                <label className="mt-4 block">
                  <span className="label block text-muted">Phone number</span>
                  <input
                    className="basket-input"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07123 456789"
                    autoComplete="tel"
                  />
                </label>

                {needsAddress && (
                  <fieldset className="basket-address">
                    <legend className="label text-muted">Delivery address</legend>
                    <label className="mt-3 block">
                      <span className="label block text-muted">Address line 1</span>
                      <input
                        className="basket-input"
                        type="text"
                        required
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="House number and street"
                        autoComplete="address-line1"
                      />
                    </label>
                    <label className="mt-4 block">
                      <span className="label block text-muted">Address line 2 (optional)</span>
                      <input
                        className="basket-input"
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        autoComplete="address-line2"
                      />
                    </label>
                    <label className="mt-4 block">
                      <span className="label block text-muted">Town or city</span>
                      <input
                        className="basket-input"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        autoComplete="address-level2"
                      />
                    </label>
                    <label className="mt-4 block">
                      <span className="label block text-muted">Postcode</span>
                      <input
                        className="basket-input"
                        type="text"
                        required
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        autoComplete="postal-code"
                      />
                    </label>
                  </fieldset>
                )}

                <button
                  type="submit"
                  className="btn btn-solid mt-5 w-full"
                  disabled={!ready}
                  data-cursor="Place"
                >
                  {needsAddress ? "Continue with delivery" : "Continue with collection"} · {gbp(total)}
                </button>
                <p className="text-[12px] leading-snug text-muted">
                  This creates an order preview only. Your details are not sent and no payment is taken.
                </p>
              </form>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

/**
 * The paper slip that drops under the bar when something is added while the drawer is closed (the hands-free F8
 * add). It lives inside the header, so it hangs exactly below the bar at any scroll position. Tap it to open the
 * basket.
 */
export function BasketToast() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string | null>(null);
  useEffect(() => basket.subscribe(setOpen), []);
  useEffect(() => {
    let t = 0;
    const unsub = order.subscribe((_, added) => {
      if (!added || basket.isOpen()) return;
      setName(added.name);
      window.clearTimeout(t);
      t = window.setTimeout(() => setName(null), 3800);
    });
    return () => {
      unsub();
      window.clearTimeout(t);
    };
  }, []);

  if (!name || open) return null;
  return (
    <div className="basket-toast container-x flex justify-end" role="status">
      <button
        type="button"
        onClick={() => {
          setName(null);
          basket.open();
        }}
      >
        <span aria-hidden className="basket-toast-tick">
          ✓
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate text-[13px] font-semibold leading-tight">{name}</span>
          <span className="label mt-0.5 block text-muted">added to the basket</span>
        </span>
        <span className="basket-toast-cta">View</span>
      </button>
    </div>
  );
}
