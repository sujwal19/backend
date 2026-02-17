import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // optional: automatically opens browser
  },
  build: {
    outDir: "dist",
  },
  // Ensure SPA routing works
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
