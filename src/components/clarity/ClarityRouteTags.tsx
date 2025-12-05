import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getClarityRouteConfig } from "./route-config";

type Props = {
  variant?: string;
  pageTypeFrom?: (pathname: string | null) => string; // optional override per usage
  enableViewEvent?: boolean;
};

function norm(v: string | null | undefined) {
  return (v ?? "").toString().trim().toLowerCase();
}

export default function ClarityRouteTags({ variant, pageTypeFrom, enableViewEvent }: Props) {
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const lastSentRef = useRef<{ page_type?: string; variant?: string; utm?: string }>({});

  useEffect(() => {
    const c = (window as any).clarity as undefined | ((...a: any[]) => void);
    if (!c) return;

    const cfg = getClarityRouteConfig();
    const pageResolver = pageTypeFrom || cfg.pageTypeFrom;
    const page_type = pageResolver(pathname);
    const v = norm(variant || cfg.getVariant?.() || "A");
    const emitView = enableViewEvent ?? cfg.enableViewEvent ?? true;

    const utm_source = norm(searchParams.get("utm_source"));
    const utm_medium = norm(searchParams.get("utm_medium"));
    const utm_campaign = norm(searchParams.get("utm_campaign"));
    const utm_term = norm(searchParams.get("utm_term"));
    const utm_content = norm(searchParams.get("utm_content"));

    const utmKey = [utm_source, utm_medium, utm_campaign, utm_term, utm_content].join("|");

    if (lastSentRef.current.page_type !== page_type) {
      c("set", "page_type", page_type);
      if (emitView) c("event", `view:${page_type}`);
      lastSentRef.current.page_type = page_type;
    }
    if (lastSentRef.current.variant !== v) {
      c("set", "variant", v);
      lastSentRef.current.variant = v;
    }
    if (lastSentRef.current.utm !== utmKey) {
      c("set", "utm_source", utm_source);
      c("set", "utm_medium", utm_medium);
      c("set", "utm_campaign", utm_campaign);
      c("set", "utm_term", utm_term);
      c("set", "utm_content", utm_content);
      lastSentRef.current.utm = utmKey;
    }
  }, [pathname, location.search, variant, pageTypeFrom, enableViewEvent]);

  return null;
}