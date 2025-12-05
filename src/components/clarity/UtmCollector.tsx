import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function UtmCollector() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const utms: { [key: string]: string } = {};
    let hasUtms = false;

    UTM_PARAMS.forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        utms[param] = value;
        hasUtms = true;
      }
    });

    if (hasUtms) {
      try {
        sessionStorage.setItem("vanguardia_utms", JSON.stringify(utms));
      } catch (error) {
        console.error("Failed to save UTMs to sessionStorage", error);
      }
    }
  }, [location.search]);

  return null;
}
