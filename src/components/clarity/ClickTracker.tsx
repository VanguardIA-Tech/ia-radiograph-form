import { useEffect } from "react";

function bestLabel(el: HTMLElement): string {
  const cta = el.getAttribute("data-cta");
  if (cta) return `cta:${cta}`;
  if (el.id) return `#${el.id}`;
  const name = el.getAttribute("name");
  if (name) return `name:${name}`;
  const raw = (("value" in el ? (el as any).value : "") || el.textContent || "").toString();
  const text = raw.trim().replace(/\s+/g, " ").slice(0, 80);
  return text || "unnamed";
}

function isInteractive(el: Element | null): el is HTMLElement {
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  if (tag === "button" || tag === "a") return true;
  if (tag === "input" && (el as HTMLInputElement).type === "submit") return true;
  if ((el as HTMLElement).getAttribute("role") === "button") return true;
  return false;
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const clarity = (window as any).clarity as undefined | ((...a: any[]) => void);
      if (!clarity) return;

      // Ancorar no elemento interativo mais próximo
      const target = (e.target as HTMLElement | null)?.closest(
        'button,[role="button"],a,input[type="submit"]'
      ) as HTMLElement | null;
      if (!isInteractive(target)) return;

      // Exclusão explícita
      if (target.getAttribute("data-track") === "false") return;

      // Botão do mouse: rastrear só primary (0) — exceto <a> (pode ser 1/2) 
      // Mantemos rastreio para <a> mesmo com modificadores (nova aba/novo foco)
      const tag = target.tagName.toLowerCase();
      if (tag !== "a" && e.button !== 0) return;

      const label = bestLabel(target);
      const eventName = `click:${location.pathname}:${label}`;
      clarity("event", eventName);
    };

    // Teclado: cobre Enter/Espaço em elementos que se comportam como botão (acessibilidade)
    const onKeyDown = (e: KeyboardEvent) => {
      const clarity = (window as any).clarity as undefined | ((...a: any[]) => void);
      if (!clarity) return;

      const target = (e.target as HTMLElement | null)?.closest(
        'button,[role="button"],a,input[type="submit"]'
      ) as HTMLElement | null;
      if (!isInteractive(target)) return;
      if (target.getAttribute("data-track") === "false") return;

      const key = e.key.toLowerCase();
      const isButtonLike = target.tagName.toLowerCase() !== "a"; // links já são ativados por Enter nativamente
      const activate = (isButtonLike && (key === "enter" || key === " ")) || (!isButtonLike && key === "enter");
      if (!activate) return;

      const label = bestLabel(target);
      const eventName = `click:${location.pathname}:${label}`;
      clarity("event", eventName);
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("keydown", onKeyDown, { capture: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true } as any);
      document.removeEventListener("keydown", onKeyDown, { capture: true } as any);
    };
  }, []);

  return null;
}