import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_ENV: z.enum(["development", "staging", "production", "test"]).default("development"),
    DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/fca"),
    DATABASE_URL_UNPOOLED: z.string().optional(),
    AUTH_SECRET: z.string().min(1).default("supersecret_auth_key_for_development_only"),
    MIDTRANS_IS_PRODUCTION: z.string().refine(
      (val) => val !== "true",
      {
        message: "SECURITY GUARD: MIDTRANS_IS_PRODUCTION must be false. Production payment is disabled for this portfolio project.",
      }
    ).default("false"),
    MIDTRANS_SERVER_KEY: z.string().min(1).default("SB-Mid-server-demo-key"),
    MIDTRANS_API_BASE_URL: z.string().url().default("https://api.sandbox.midtrans.com"),
    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().optional(),
    UPLOADTHING_TOKEN: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    DEMO_ACCOUNT_PASSWORD: z.string().default("demo123456"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: z.string().default("SB-Mid-client-demo-key"),
    NEXT_PUBLIC_MIDTRANS_SNAP_SCRIPT_URL: z.string().url().default("https://app.sandbox.midtrans.com/snap/snap.js"),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  },
  runtimeEnv: {
    APP_ENV: process.env.APP_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
    AUTH_SECRET: process.env.AUTH_SECRET,
    MIDTRANS_IS_PRODUCTION: process.env.MIDTRANS_IS_PRODUCTION,
    MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    MIDTRANS_API_BASE_URL: process.env.MIDTRANS_API_BASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    DEMO_ACCOUNT_PASSWORD: process.env.DEMO_ACCOUNT_PASSWORD,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    NEXT_PUBLIC_MIDTRANS_SNAP_SCRIPT_URL: process.env.NEXT_PUBLIC_MIDTRANS_SNAP_SCRIPT_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
