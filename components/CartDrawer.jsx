"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";

/**
 * CartDrawer
 * Slide-down panel listing items currently in the cart. Purely presentational —
 * quantity changes are reported back up via onIncrement/onDecrement.
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {{product: object, quantity: number}[]} items
 * @param {number} totalPrice
 * @param {(id: string) => void} onIncrement
 * @param {(id: string) => void} onDecrement
 */
export default function CartDrawer({ open, onClose, items, totalPrice, onIncrement, onDecrement }) {
  if (!open) return null;

  return (
    <>
      {/* backdrop */}
      <button
        aria-label="Close cart"
        onClick={onClose}
        className="fixed inset-0 bg-ink/40 z-40"
      />

      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-paper border-l-2 border-ink z-50 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-ink/80">
          <h2 className="font-display uppercase tracking-wide text-lg flex items-center gap-2">
            <ShoppingBag size={18} /> Your Tin
          </h2>
          <button
            aria-label="Close cart"
            onClick={onClose}
            className="p-1.5 hover:bg-ink hover:text-paper rounded-tag transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="font-mono text-sm text-ink/50 mt-8 text-center">
              Nothing in the tin yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 pb-4 border-b border-line">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-tag border border-ink/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-display uppercase text-sm tracking-wide truncate">
                      {product.name}
                    </p>
                    <p className="font-mono text-xs text-ink/50 mt-0.5">
                      ₹{product.price} · {product.weight}
                    </p>
                    <div className="flex items-center gap-2 mt-2 border border-ink/30 rounded-tag w-fit">
                      <button
                        aria-label={`Remove one ${product.name}`}
                        onClick={() => onDecrement(product.id)}
                        className="px-2 py-1 hover:bg-ink hover:text-paper transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-xs tabular-nums w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        aria-label={`Add one more ${product.name}`}
                        onClick={() => onIncrement(product.id)}
                        className="px-2 py-1 hover:bg-ink hover:text-paper transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <span className="font-mono text-sm shrink-0">
                    ₹{product.price * quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t-2 border-ink/80">
            <div className="flex items-center justify-between font-mono text-sm mb-3">
              <span className="uppercase tracking-wider text-ink/60">Subtotal</span>
              <span className="text-base font-medium">₹{totalPrice}</span>
            </div>
            <button
              type="button"
              className="w-full py-3 font-display uppercase tracking-wider text-sm rounded-tag border-2 border-ink bg-ink text-paper hover:bg-brass hover:border-brass transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
