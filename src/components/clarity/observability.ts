let lastIdentify = "";
let lastErrorAt = 0;

export async function hashEmail(raw: string): Promise<string> {
  const email = (raw || "").trim().toLowerCase();
  const enc = new TextEncoder().encode(email);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
  return hex;
}

export function clarity(): ((...a:any[])=>void) | null {
  return (typeof window !== "undefined" && (window as any).clarity) ? (window as any).clarity : null;
}

export function safeEvent(name: string) {
  const c = clarity();
  if (!c) return;
  c("event", name);
}

export function setTag(key: string, val: string) {
  const c = clarity();
  if (!c) return;
  c("set", key, val);
}

export function upgrade(reason = "form_submit") {
  const c = clarity();
  if (!c) return;
  c("upgrade", reason);
}

export async function identifyOnce(hashedUserId: string) {
  if (!hashedUserId || hashedUserId === lastIdentify) return;
  const c = clarity();
  if (!c) return;
  c("identify", `user_${hashedUserId}`);
  lastIdentify = hashedUserId;
}

export function validationErrorOnce(field?: string) {
  const now = Date.now();
  if (now - lastErrorAt < 1000) return; // debounce 1s
  if (field) setTag("form_last_error", field);
  safeEvent("form:validation_error");
  lastErrorAt = now;
}