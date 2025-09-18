import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store"; // 👈 Import store
import { Provider } from "react-redux"; // 👈 Import Provider
import { RouterProvider } from "react-router-dom";
import router from "./app/router";

import "@/styles/index.css";
import "@/app/i18n";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
