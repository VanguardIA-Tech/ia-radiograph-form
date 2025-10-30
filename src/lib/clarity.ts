import Clarity from "@microsoft/clarity";

export function initClarity() {
  // Só roda no cliente e em produção

  console.log(typeof window === "undefined" || !import.meta.env.PROD)
  console.log(!import.meta.env.PROD)
  if (typeof window === "undefined" || !import.meta.env.PROD) return;



  const projectId = import.meta.env.VITE_CLARITY_ID as string | undefined;
  if (!projectId) return;

  Clarity.init(projectId);
}