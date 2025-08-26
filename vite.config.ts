import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",                 // ✅ custom domain needs root base
  server: { host: "::", port: 8080 }, // (dev only, ok to keep)
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
