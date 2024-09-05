import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  worker: {
    format: "es",
  },
  resolve: {
    alias: {
      "node-fetch": "isomorphic-fetch",
      // components: `${path.resolve(__dirname, "./src/components/")}`,
      // stores: `${path.resolve(__dirname, "./src/stores/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      layout: `${path.resolve(__dirname, "./src/layout/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      lib: `${path.resolve(__dirname, "./src/lib/")}`,
      providers: `${path.resolve(__dirname, "./src/providers/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`,
      services: `${path.resolve(__dirname, "./src/services/")}`,
      modules: `${path.resolve(__dirname, "./src/modules/")}`,
    },
  },
  assetsInclude: ["**/*.whl", "**/*.json"],
});
