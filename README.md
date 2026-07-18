# Fieldwork Supply Co. — webstore starter

A Next.js (App Router) starter for a webstore, styled around a durable
outdoor/workwear aesthetic — product cards look like the hang-tags wired to
real gear.

## Structure

```
app/
  layout.js        Root layout, loads fonts (Oswald / Work Sans / IBM Plex Mono)
  page.js           Renders <Homepage />
  globals.css       Tailwind + the stitched/punch-hole styles
components/
  Homepage.jsx      Nav, hero, and product grid
  ProductCard.jsx   Single product card (hang-tag styling)
data/
  products.js       Dummy product array — swap for a real API/CMS later
```

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Swapping in real data

`Homepage.jsx` imports `products` from `data/products.js` and maps over it.
To connect a real backend, replace that import with a fetch (e.g. in a
Server Component: `const products = await getProducts()`) — `ProductCard`
doesn't need to change as long as each product object keeps the same shape
(`id`, `sku`, `name`, `category`, `price`, `compareAtPrice`, `material`,
`image`, `badge`, `inStock`).
