import Clarity from "@microsoft/clarity";

export function initClarity() {
  const projectId = import.meta.env.VITE_CLARITY_ID as string | undefined;
  if (!projectId) return;

  Clarity.init(projectId);
}