"use client";

import { useState, useEffect } from "react";
import { Circle, Minus, Plus } from "lucide-react";

/**
 * ProductCard
 * Renders a single product styled like a hang-tag wired to the tin — a punch
 * hole, a dashed stitch line, and the SKU stamped in mono type.
 *
 * @param {object} product     - see data/products.js for the expected shape
 * @param {number} quantity    - current quantity of this product in the cart
 * @param {(product: object) => void} onAdd
 * @param {(id: string) => void} onIncrement
 * @param {(id: string) => void} onDecrement
 */
export default function ProductCard({ product, quantity = 0, onAdd, onIncrement, onDecrement }) {
  const { id, name, category, weight, price, compareAtPrice, description, image, badge, sku, inStock } = product;

  const onSale = compareAtPrice && compareAtPrice > price;
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 900);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
  };

  return (
    <article className="tag-hover group relative w-full">
      {/* punch hole + wire, sitting above the card like a real tag */}
      <div className="flex justify-center">
        <div className="punch-hole" aria-hidden="true" />
      </div>

      <div className="relative bg-paper border-2 border-ink/80 rounded-tag overflow-hidden">
        {/* badge */}
        {badge && (
          <span
            className={`absolute top-3 left-3 z-10 font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded-tag text-paper ${
              badge === "Sale" ? "bg-rust" : "bg-forest"
            }`}
          >
            {badge}
          </span>
        )}

        {/* weight tag, top right */}
        <span className="absolute top-3 right-3 z-10 font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded-tag bg-paper/90 border border-ink/30 text-ink/70">
          {weight}
        </span>

        {/* image */}
        <div className="aspect-[4/5] w-full overflow-hidden bg-canvas">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* stitched divider */}
        <div className="stitched" />

        {/* details */}
        <div className="p-4">
          <p className="font-mono text-[11px] text-forest/70 uppercase tracking-wider">
            {category} · {sku}
          </p>
          <h3 className="font-display text-lg leading-tight uppercase tracking-wide mt-1">
            {name}
          </h3>

          <p className="text-sm text-ink/60 mt-2 leading-snug">{description}</p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-base font-medium">₹{price}</span>
              {onSale && (
                <span className="text-xs text-ink/40 line-through">₹{compareAtPrice}</span>
              )}
            </div>

            <span className="flex items-center gap-1 text-xs font-mono uppercase tracking-wide">
              <Circle
                size={8}
                className={inStock ? "fill-forest text-forest" : "fill-rust text-rust"}
              />
              {inStock ? "In stock" : "Sold out"}
            </span>
          </div>

          {/* add to cart / quantity stepper */}
          {quantity === 0 ? (
            <button
              type="button"
              disabled={!inStock}
              onClick={handleAdd}
              className={`mt-4 w-full py-2.5 font-display uppercase tracking-wider text-sm rounded-tag border-2 transition-colors disabled:bg-transparent disabled:text-ink/40 disabled:border-ink/30 disabled:cursor-not-allowed ${
                justAdded
                  ? "bg-forest border-forest text-paper"
                  : "border-ink bg-ink text-paper hover:bg-brass hover:border-brass"
              }`}
            >
              {!inStock ? "Notify me" : justAdded ? "Added ✓" : "Add to cart"}
            </button>
          ) : (
            <div className="mt-4 flex items-center justify-between border-2 border-ink rounded-tag overflow-hidden">
              <button
                type="button"
                aria-label={`Remove one ${name}`}
                onClick={() => onDecrement(id)}
                className="px-3 py-2.5 text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-mono text-sm tabular-nums">{quantity} in cart</span>
              <button
                type="button"
                aria-label={`Add one more ${name}`}
                onClick={() => onIncrement(id)}
                className="px-3 py-2.5 text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
