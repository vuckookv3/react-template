import generouted from '@generouted/react-router/plugin';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import path from 'node:path';
import {
  defineConfig,
  // loadEnv
}
  from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      million.vite({ auto: true }),
      react(),
      generouted(),
    ],
    base: '/admin/',
    server: {
      port: 3000,
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
  };
});
