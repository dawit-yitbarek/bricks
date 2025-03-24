import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl = 'http://localhost:5173/tonconnect-manifest.json';
const root = createRoot(document.getElementById("root"));
root.render(

    <React.StrictMode >
      <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
      </TonConnectUIProvider>
    </React.StrictMode>
);

