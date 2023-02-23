import { defineConfig } from 'dumi';

const name = 'create';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name,
    socialLinks: {
      github: `https://github.com/dxsixpc/${name}`,
    },
    logo: `/${name}/logo.png`,
  },
  base: `/${name}/`,
  publicPath: `/${name}/`,
});
