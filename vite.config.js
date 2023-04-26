import { defineConfig } from "vite";

export default defineConfig({
  base: '/mol',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        // ...
        // List all files you want in your build
      }
    },
    base: '/mol',
  }
})
