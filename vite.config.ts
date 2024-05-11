import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import fs from 'fs'

// https://vitejs.dev/config/

export default defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd()) // 获取 .env里面定义是参数
  return {
    plugins: [
      react(),
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用 gzip 压缩
        threshold: 10240, // 压缩文件的大小阈值（以字节为单位）
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 压缩文件的后缀名
        deleteOriginFile: true, // 是否删除原文件
      }),
    ],
    base: env.NODE_ENV || '/',
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      cors: true,
      strictPort: false,
      hmr: true,
      https: {
        key: fs.readFileSync("./certs/localhost+3-key.pem"),
        cert: fs.readFileSync("./certs/localhost+3.pem"),
      },
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      }
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      preserveSymlinks: false
    },
    build: {
      target: "es2015",
      outDir: "build",
      cssCodeSplit: true,
      minify: "terser",
      chunkSizeWarningLimit: 1500,
      emptyOutDir: true,
      sourcemap: false,
      assetsDir: "assets",
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
            return `js/${fileName}/[name].[hash].js`;
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
        scopeBehaviour: "local",
        generateScopedName: '[name]_[local]_[hash:5]'
      },
      devSourcemap: true,
      postcss: {
        plugins: []
      },
    },
  }
})
