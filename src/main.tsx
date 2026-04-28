import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routers from "./Router/Routers";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "@/locales/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
  </StrictMode>,
);
