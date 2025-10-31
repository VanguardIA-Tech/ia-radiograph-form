"use client";

import React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

/**
 * Color tokens (kept as hex for predictable rendering across browsers)
 * - Aviso: amarelo claro de fundo + texto escuro
 * - Erro: vermelho + texto branco
 */
const WARN_BG = "#FEF3C7"; // amber-100
const WARN_COLOR = "#92400E"; // amber-700 (legível sobre o amarelo)
const ERROR_BG = "#EF4444"; // red-500
const ERROR_COLOR = "#FFFFFF"; // white

/**
 * Create a wrapper around sonner's toast function so we can force styles
 * for default (used as "aviso") and error toasts.
 *
 * We preserve other helper methods (success, loading, dismiss, update, etc.)
 * by copying them from the original sonner toast.
 */
function createWrappedToast() {
  // base function (default toast / aviso)
  const wrapped: any = (message: any, options?: any) => {
    return sonnerToast(message, {
      ...options,
      style: {
        // allow override by caller but default to warning palette
        background: WARN_BG,
        color: WARN_COLOR,
        ...(options?.style ?? {}),
      },
    });
  };

  // keep existing helpers but override error and keep others intact
  wrapped.error = (message: any, options?: any) =>
    sonnerToast.error(message, {
      ...options,
      style: {
        background: ERROR_BG,
        color: ERROR_COLOR,
        ...(options?.style ?? {}),
      },
    });

  // keep success and other methods unmodified
  wrapped.success = (...args: any[]) => (sonnerToast as any).success(...args);
  wrapped.loading = (...args: any[]) => (sonnerToast as any).loading(...args);
  wrapped.dismiss = (...args: any[]) => (sonnerToast as any).dismiss(...args);
  wrapped.update = (...args: any[]) => (sonnerToast as any).update(...args);
  wrapped.promise = (...args: any[]) => (sonnerToast as any).promise(...args);

  return wrapped;
}

export const toast = createWrappedToast();

/**
 * Re-export the Toaster so the app keeps rendering the Sonner Toaster component
 * from the same path (used in App.tsx).
 */
export const Toaster = (props: React.ComponentProps<typeof SonnerToaster>) => {
  return <SonnerToaster {...props} />;
};

export default Toaster;