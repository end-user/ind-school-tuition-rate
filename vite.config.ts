import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    server:{
        port:3000,
        strictPort:true,
        proxy:{
        '/api':
                {
                    target: 'https://datacollection.education.vermont.gov',
                    changeOrigin: true,
                    rewrite: (path)=>path.replace(/^\/api/,'/api/lists')
                }
        }
    },
    plugins: [svgr(),react()],
})
