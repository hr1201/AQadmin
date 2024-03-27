import path from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig(({ mode }) => {
  const env: any = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __APP_ENV__: env.APP_ENV
    },
    plugins: [
      vue(),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],

        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3'
      })
    ],
    build: {
      chunkSizeWarningLimit: 600, //达到600k打包才会提示
      cssCodeSplit: false, //css 拆分
      sourcemap: false, //不生成sourcemap
      minify: false, //是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
      assetsInlineLimit: 5000 //小于该值 图片将打包成Base64
    },
    resolve: {
      // ./src路径的别名
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: false, //自动打开
      host: 'localhost',
      port: 5173, // 代理服务器
      proxy: {
        // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        '/api': {
          target: env.VITE_BASIC_URL, // 后端服务实际地址
          changeOrigin: true, //开启代理,允许跨域
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
