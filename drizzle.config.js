import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  
  dbCredentials: {
    url: 'postgresql://saas_owner:npg_CTXuBRqK79EM@ep-icy-frost-a8zoq9pi-pooler.eastus2.azure.neon.tech/saas?sslmode=require',
  },
});
