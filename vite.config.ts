import generouted from '@generouted/react-router/plugin';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import path from 'node:path';
import {
  defineConfig,
  loadEnv
}
  from 'vite';
// import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      million.vite({ auto: true }),
      react(),
      generouted(),
      // checker({
      //   typescript: true,
      //   overlay: true,
      //   eslint: {
      //     lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      //   },
      // }),
    ],
    base: './',
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
  };
});
