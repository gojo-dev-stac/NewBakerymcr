"use client";

// Tiny order store: "Add" buttons add a priced line, the header's Basket pill counts them, the Basket drawer
// shows the lines and places the order. A second, tiny store holds whether the drawer is open, so any section
// (the counter, the builder) can open it after a real "Add" click.
export type BasketLine = { name: string; price: number; qty: number };

type Listener = (count: number, added?: { name: string }, lines?: BasketLine[]) => void;

let lines: BasketLine[] = [];
const listeners = new Set<Listener>();

const count = () => lines.reduce((n, l) => n + l.qty, 0);
const snap = () => lines.map((l) => ({ ...l }));
const emit = (added?: { name: string }) => {
  const c = count();
  const s = snap();
  listeners.forEach((l) => l(c, added, s));
};

export const order = {
  add(name: string, price = 0) {
    const hit = lines.find((l) => l.name === name && l.price === price);
    if (hit) hit.qty += 1;
    else lines.push({ name, price, qty: 1 });
    emit({ name });
  },
  /** qty ≤ 0 removes the line */
  setQty(name: string, price: number, qty: number) {
    const i = lines.findIndex((l) => l.name === name && l.price === price);
    if (i < 0) return;
    if (qty <= 0) lines.splice(i, 1);
    else lines[i].qty = qty;
    emit();
  },
  clear() {
    lines = [];
    emit();
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    fn(count(), undefined, snap());
    return () => {
      listeners.delete(fn);
    };
  },
};

/* ---- the drawer's open state ---- */
type OpenListener = (open: boolean) => void;
let open = false;
const openListeners = new Set<OpenListener>();
const setOpen = (v: boolean) => {
  if (open === v) return;
  open = v;
  openListeners.forEach((l) => l(v));
};

export const basket = {
  isOpen: () => open,
  open: () => setOpen(true),
  close: () => setOpen(false),
  toggle: () => setOpen(!open),
  subscribe(fn: OpenListener) {
    openListeners.add(fn);
    fn(open);
    return () => {
      openListeners.delete(fn);
    };
  },
};
