import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint2';

// https://vitejs.dev/config/
export default defineConfig({
  base: "newframe",
  plugins: [
    vue(),
    eslint({
      fix: true,
      include: ['src/**/*.ts', 'src/**/*.vue']
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
});
