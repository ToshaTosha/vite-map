import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

const root = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": root + "/",
    },
  },
})
