import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

export default defineConfig({
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.REACT_APP_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
