import Clarity from "@microsoft/clarity";

export function initClarity() {
  // Só roda no cliente e em produção
  if (typeof window === "undefined" || !import.meta.env.PROD) return;

  const projectId = import.meta.env.VITE_CLARITY_ID as string | undefined;
  if (!projectId) return;

  Clarity.init(projectId);
}