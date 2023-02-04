import { defineConfig } from 'dumi';

const name = 'dumi-react';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name,
    socialLinks: {
      github: 'https://github.com/dxsixpc/create',
    },
  },
  base: `/${name}/`,
  publicPath: `/${name}/`,
});
