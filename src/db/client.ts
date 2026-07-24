import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Cache connection in development mode
neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/fca");

export const db = drizzle(sql, { schema });
