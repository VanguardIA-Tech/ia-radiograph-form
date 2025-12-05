import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initClarity } from "./lib/clarity";

// Inicializa Clarity com ID vindo de runtime (window.CLARITY_ID)
// O ID pode ser injetado pelo container via script antes deste bundle
// Exemplo no container:
//   <script>
//     window.CLARITY_ID = 'seu_clarity_id_aqui';
//   </script>
//   <script src="/assets/index.js"></script>
const clarityId = initClarity();
if (clarityId) {
  localStorage.setItem('CLARITY_PROJECT_ID', clarityId);
}

createRoot(document.getElementById("root")!).render(<App />);
