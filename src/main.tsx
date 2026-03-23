import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import { queryClient } from "./lib/queryClient.ts";
import { PostHogProvider } from "@posthog/react";
import { POSTHOG_API_KEY, POSTHOG_OPTIONS } from "./lib/posthog.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider apiKey={POSTHOG_API_KEY} options={POSTHOG_OPTIONS}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </PostHogProvider>
  </StrictMode>,
);
