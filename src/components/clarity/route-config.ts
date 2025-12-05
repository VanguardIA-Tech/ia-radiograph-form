// Reusable configuration for Clarity route tagging.
// Projects can customize page type mapping and variant source
// by either editing this file or overriding via window.__clarityRouteConfig.

export type PageType = "landing-icia" | "other" | string;

export interface ClarityRouteConfig {
  pageTypeFrom: (pathname: string | null) => PageType;
  getVariant?: () => string | undefined;
  enableViewEvent?: boolean; // emits view:<pageType>
}

function defaultPageTypeFrom(pathname: string | null): PageType {
  const p = pathname || "/";
  if (p === "/") return "landing-icia";
  // Projeto tem apenas Index + NotFound
  return "other";
}

function defaultGetVariant(): string | undefined {
  // Vite expõe env vars com prefixo VITE_
  const v = (import.meta.env.VITE_VARIANT || "A").toString().trim();
  return v || undefined;
}

export function getClarityRouteConfig(): ClarityRouteConfig {
  // Allow runtime override without rebuilding via globalThis
  const globalCfg = (typeof window !== "undefined" && (window as any).__clarityRouteConfig) as
    | Partial<ClarityRouteConfig>
    | undefined;

  return {
    pageTypeFrom: globalCfg?.pageTypeFrom || defaultPageTypeFrom,
    getVariant: globalCfg?.getVariant || defaultGetVariant,
    enableViewEvent: globalCfg?.enableViewEvent ?? true,
  };
}
