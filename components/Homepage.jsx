"use client";

import { useState, useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import ProductCard from "./ProductCard";
import CartDrawer from "./CartDrawer";
import products from "../data/products";

/**
 * Homepage
 * Store landing page: nav, hero, and a grid of ProductCards built from
 * dummy data in data/products.js. Cart state lives here and is passed down —
 * swap the data import for a real fetch later without touching the cart logic.
 */
export default function Homepage() {
  const [quantities, setQuantities] = useState({}); // { [productId]: qty }
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setQuantities((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
  };

  const increment = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id) => {
    setQuantities((prev) => {
      const next = { ...prev };
      const current = (next[id] || 0) - 1;
      if (current <= 0) {
        delete next[id];
      } else {
        next[id] = current;
      }
      return next;
    });
  };

  const cartItems = useMemo(
    () =>
      Object.entries(quantities)
        .map(([id, quantity]) => ({
          product: products.find((p) => p.id === id),
          quantity,
        }))
        .filter((item) => item.product),
    [quantities]
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <main className="min-h-screen bg-canvas text-ink font-body">
      {/* nav */}
      <header className="border-b-2 border-ink/80 sticky top-0 bg-canvas z-30">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-display uppercase tracking-widest text-lg">
            Masala Tin Co.
          </span>
          <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-ink/70">
            <a href="#catalog" className="hidden sm:inline hover:text-ink">Catalog</a>
            <a href="#about" className="hidden sm:inline hover:text-ink">Our Kitchen</a>
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 hover:text-ink"
              aria-label="Open cart"
            >
              <ShoppingBag size={16} />
              Cart ({totalItems})
            </button>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="border-b-2 border-ink/80 bg-forest text-paper overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass mb-4">
              Small-batch biscuits &amp; namkeen, tinned fresh
            </p>
            <h1 className="font-display uppercase text-4xl sm:text-5xl leading-[1.05] tracking-wide">
              The tin your chai
              <br /> has been waiting for.
            </h1>
            <p className="mt-5 text-paper/70 max-w-md leading-relaxed">
              Butter biscuits, roasted namkeen, and nankhatai made in small
              batches and packed the same day, the way your favourite
              snack-wallah does it.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#catalog"
                className="inline-block px-6 py-3 bg-brass text-ink font-display uppercase tracking-wider text-sm rounded-tag hover:bg-paper transition-colors"
              >
                Open the tin
              </a>
              <span className="font-mono text-xs uppercase tracking-wider text-paper/60">
                Free delivery over ₹499
              </span>
            </div>
          </div>

          <div className="stitched-box rounded-tag p-6 font-mono text-sm text-paper/80 leading-relaxed bg-forest/40">
            <p className="text-brass uppercase tracking-wider text-xs mb-2">
              Batch note
            </p>
            <p>
              Every tin carries the roast date stamped on the lid because
              namkeen tastes best in its first three weeks, not its
              thirtieth.
            </p>
            <div className="mt-5 pt-5 border-t border-paper/20 flex items-center justify-between text-xs uppercase tracking-wider text-paper/60">
              <span>Roasted Tue &amp; Fri</span>
              <span>No preservatives</span>
            </div>
          </div>
        </div>
      </section>

      {/* product grid */}
      <section id="catalog" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display uppercase text-2xl tracking-wide">
            From the Store
          </h2>
          <span className="font-mono text-xs uppercase tracking-wider text-ink/50">
            {products.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 0}
              onAdd={addToCart}
              onIncrement={increment}
              onDecrement={decrement}
            />
          ))}
        </div>
      </section>

      {/* footer */}
      <footer id="about" className="border-t-2 border-ink/80 bg-forest text-paper/60">
        <div className="max-w-6xl mx-auto px-6 py-10 font-mono text-xs uppercase tracking-wider flex flex-col sm:flex-row justify-between gap-4">
          <span>Masala Tin Co. — Roasted, not fried alone in a factory.</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        totalPrice={totalPrice}
        onIncrement={increment}
        onDecrement={decrement}
      />
    </main>
  );
}
