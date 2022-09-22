import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import "../assets/style/style.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./common/ProductsData/Store";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
