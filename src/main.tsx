import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initClarity } from "./lib/clarity";

initClarity();

createRoot(document.getElementById("root")!).render(<App />);