import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve as resolvePaths } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolvePaths(__dirname, "./src"),
    },
  },
});
