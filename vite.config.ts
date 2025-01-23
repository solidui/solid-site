import { defineConfig, type Plugin } from 'vite';
import solid from 'vite-plugin-solid';
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import pckg from './package.json' assert { type: 'json' };
import { VitePWA } from 'vite-plugin-pwa';
import pwaoptions from './pwaoptions';

export default defineConfig({
  define: {
    __UPDATED_AT__: JSON.stringify(new Date().toLocaleString()),
    __SOLID_VERSION__: JSON.stringify(pckg.dependencies['solid-js']),
  },
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      }),
      enforce: 'pre',
    } as Plugin,
    solid({ extensions: ['.md', '.mdx'] }),
    VitePWA(pwaoptions),
  ],
  optimizeDeps: {
    include: ['monaco-textmate', 'onigasm', 'monaco-editor-textmate'],
    exclude: ['@solid.js/docs'],
  },
  build: {
    target: 'esnext',
  },
});
