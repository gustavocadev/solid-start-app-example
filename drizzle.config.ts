import type { Config } from "drizzle-kit";

process.loadEnvFile();

export default {
  schema: "./src/lib/drizzle/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABLE_URL ?? "",
  },
} satisfies Config;
