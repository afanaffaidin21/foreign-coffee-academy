import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/modules": path.resolve(__dirname, "./src/modules"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/db": path.resolve(__dirname, "./src/db"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
