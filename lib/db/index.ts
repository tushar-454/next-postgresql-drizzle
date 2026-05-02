import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const globalForDB = globalThis as unknown as {
    conn: NeonQueryFunction<false, false> | undefined;
};

const sql = globalForDB.conn ?? neon(process.env.DATABASE_URL!);

if (process.env.NODE_ENV !== "production") globalForDB.conn = sql;

export const db = drizzle(sql, { schema });
