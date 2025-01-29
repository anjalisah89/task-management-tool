import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
// Author: Anjali Sah
// anjalisah89@gmail.com
// https://github.com/anjalisah89
// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tsconfigPaths(),],
})

