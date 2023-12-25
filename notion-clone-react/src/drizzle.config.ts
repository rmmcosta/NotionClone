import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

export default defineConfig({
  schema: "./db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.REACT_APP_NOTIONCLONE_DB_URL!,
  },
  verbose: true,
  strict: true,
});
