import { defineConfig } from 'vite';

export default defineConfig({
  root: './playground',
  server: {
    port: 3000, // Change to a different port if needed
  },
  build: {
    rollupOptions: {
      input: {
        main: './playground/electricity-comparison.html', //change to different file if needed
      },
    },
  },
});