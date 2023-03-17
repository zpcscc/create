import { defineConfig } from 'dumi';

const name = 'dumi-react';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name,
  },
  base: `/${name}/`,
  publicPath: `/${name}/`,
});
