import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./styles/main.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
