import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://e-commerce-store-3qjv.onrender.com",//"http://localhost:5000"
      "/uploads/": "https://e-commerce-store-3qjv.onrender.com",//"http://localhost:5000"
    },
  },
});
