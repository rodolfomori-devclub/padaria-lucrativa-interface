export const POSTHOG_OPTIONS = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2026-01-30",
  person_profiles: "always",
} as const;

export const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY;
