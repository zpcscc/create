# dumi-react

## 简介

这是基于 dumi 官方脚手架"create-dumi"的"React Library"模板生成的一套项目代码。

这里主要替换了一些项目配置，例如 eslint，prettier 等配置使用@dxsixpc/configs 里的通用配置

## 使用

使用可参考 dumi 官方文档https://d.umijs.org/

## 开发

```bash
# 安装依赖
$ npm install

# 本地调试运行文档
$ npm start

# 打包src下的资源代码
$ npm run build

# 动态打包src下的资源代码
$ npm run build:watch

# 打包文档
$ npm run docs:build

# 检查项目是否存在潜在问题
$ npm run doctor

# 提交代码
$ npm run commit
```

## 可能遇到的问题

### 页面发布到 github 上后，打开是空白

多半是路径设置问题。没有找到资源文件。可按如下设置

```ts
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
  // 重点是base与publicPath字段。通常情况下，这里是当前项目的github仓库名称。
  // 最后在gh-pages上打开的链接应该是类似这样的格式 https://dxsixpc.github.io/dumi-react
  base: `/${name}/`,
  publicPath: `/${name}/`,
});
```

## LICENSE

MIT
