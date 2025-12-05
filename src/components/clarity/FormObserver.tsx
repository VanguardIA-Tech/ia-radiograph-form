import { useCallback } from "react";
import { hashEmail, safeEvent, identifyOnce, upgrade, validationErrorOnce } from "@/components/clarity/observability";

export function useFormTelemetry() {
  const onSuccess = useCallback(async (email?: string) => {
    safeEvent("form:submit_success");
    upgrade("form_submit");
    if (email) {
      const hash = await hashEmail(email);
      await identifyOnce(hash);
    }
  }, []);

  const onValidationError = useCallback((field?: string) => {
    validationErrorOnce(field);
  }, []);

  return { onSuccess, onValidationError };
}