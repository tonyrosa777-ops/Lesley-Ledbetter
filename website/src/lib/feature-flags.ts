// Feature flags for progressive reveal of built-but-hidden features.
//
// Set NEXT_PUBLIC_SHOP_ENABLED=true in the deployment environment (Vercel)
// to reveal the shop, cart icon, and /shop route. All shop code remains in
// the repo so flipping the flag requires only a rebuild — no code changes.
//
// These are client-exposed flags — do NOT put secrets behind NEXT_PUBLIC_*.
export const isShopEnabled =
  process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";
