import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "./store/store";
import App from "./App";
import "@mantine/core/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={{
          primaryColor: "violet",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
