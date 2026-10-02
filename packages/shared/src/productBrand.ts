/**
 * Fork-owned product identity.
 *
 * Keep user-facing names, slugs, and app identifiers here so a future rename
 * does not require changing implementation package names or searching the
 * entire repository for branding literals.
 */
export const PRODUCT_BRAND = {
  name: "Bridge",
  slug: "bridge",
  desktopAppId: "com.bridgeapp.bridge",
  mobileBundleId: "com.bridgeapp.bridge",
  repository: "stemcloudmedia/bridge",
} as const;

export type ProductBrand = typeof PRODUCT_BRAND;
