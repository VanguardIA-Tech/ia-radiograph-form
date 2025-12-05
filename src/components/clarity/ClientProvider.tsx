import { useEffect } from "react";

export function ClientProvider() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).clarity) {
      if (process.env.NODE_ENV !== "production") {
        console.info("Clarity bootstrap ativo");
      }
    }
  }, []);
  return null;
}