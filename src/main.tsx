import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient.ts";
import React from "react";

// if (process.env.NODE_ENV === 'development') {
//   import('./mocks/browser.ts').then(({ worker }) => {
//     worker.start();
//   });
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
