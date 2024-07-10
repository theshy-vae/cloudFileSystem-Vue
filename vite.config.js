import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  
  server: {
    hmr: true, // 开启热更新
    // proxy: {
    //   '/api': { //这里的test可以理解为后端接口里面的前缀，就是所有的地址前面都是http://aaa.com/test/xxx/xxx
    //     target: 'http://localhost:8000/',//这个不多说，请求的目标地址
    //     changeOrigin: true,//是否允许跨域
    //     //rewrite: path => path.replace(/^\/api/, '')
    //     pathRewrite: {
    //       '^/api': '/' // 重写路径（表示请求的地址没有test前缀的时候）
    //     }
    //   }
    // }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],

})
