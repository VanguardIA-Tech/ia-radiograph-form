import Clarity from "@microsoft/clarity";

export function initClarity(): string | undefined {
  // Em runtime, busca CLARITY_ID de:
  // 1. window.CLARITY_ID (injetado pelo container/EasyPanel via script ou env)
  // 2. window.__APP_CONFIG__.clarityId (se existir)
  // 3. import.meta.env.VITE_CLARITY_ID (fallback build-time, apenas dev)
  const projectId =
    (window as any).CLARITY_ID ||
    (window as any).__APP_CONFIG__?.clarityId ||
    import.meta.env.VITE_CLARITY_ID;

  if (!projectId) {
    if (import.meta.env.MODE !== "production") {
      console.warn("[Clarity] CLARITY_ID não encontrado. Tracking desabilitado.");
    }
    return undefined;
  }

  Clarity.init(projectId);
  return projectId;
}