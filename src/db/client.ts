import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Cache connection in development mode
neonConfig.fetchConnectionCache = true;

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL environment variable is missing in .env file");
}

const sql = neon(dbUrl);

export const db = drizzle(sql, { schema });
