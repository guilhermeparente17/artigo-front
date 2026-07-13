import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";

const queryClient = new QueryClient();
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="355654019651-kfol8v191ilblede3uun41r1d745vqq4.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.Fragment>,
);
