import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";


// Injeta o script do Clarity usando window.CLARITY_ID (runtime, para EasyPanel)
const injectClarityScript = () => {
	const CLARITY_ID = (window as any).CLARITY_ID || import.meta.env.VITE_CLARITY_ID;
	if (!CLARITY_ID) {
		if (import.meta.env.MODE !== "production") {
			console.warn("[Clarity] CLARITY_ID ausente; tracking não será carregado.");
		}
		return;
	}
	const existing = document.getElementById("clarity-script");
	if (existing) return;
	const script = document.createElement("script");
	script.id = "clarity-script";
	script.async = true;
	script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
	const firstScript = document.getElementsByTagName("script")[0];
	if (firstScript && firstScript.parentNode) {
		firstScript.parentNode.insertBefore(script, firstScript);
	} else {
		document.head.appendChild(script);
	}
};

// Clarity consent/unmask: padrão permissivo para QA; ajuste se houver política mais restrita
const setupClarityConsent = () => {
	const clarity = (window as any).clarity as undefined | ((...a: any[]) => void);
	if (clarity) {
		clarity("consentv2", { ad_Storage: "granted", analytics_Storage: "granted" });
		document.documentElement.setAttribute("data-clarity-unmask", "true");
		if (import.meta.env.MODE !== "production") {
			console.info("[Clarity] Consent granted + unmask enabled");
		}
		return;
	}
	setTimeout(setupClarityConsent, 300);
};

if (typeof window !== "undefined") {
	injectClarityScript();
	setupClarityConsent();
}

createRoot(document.getElementById("root")!).render(<App />);
