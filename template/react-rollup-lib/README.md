# react-rollup-lib

## 简介

这是基于 react 官方脚手架"create-react-app"生成的一套项目代码。

这里主要替换了一些项目配置，例如 eslint，prettier 等配置使用@dxsixpc/configs 里的通用配置

并且使用@dxsixpc/configs 的 rollup 进行打包。这里是打包成“js 库”

## 开发

```bash
# 安装依赖
$ npm install

# 本地调试运行文档
$ npm start || npm run dev

# 打包src下的资源代码
$ npm run build

# 提交代码
$ npm run commit
```

## rollup 配置

`rollup.config.mjs`

```js
import rollupConfig from '@dxsixpc/configs/rollup-config/index.mjs';

export default rollupConfig({
  // @dxsixpc/configs里的rollup默认提供了许多插件配置。这里只需要指定打包类型即可。
  buildType: 'lib',
  input: 'src/index.tsx',
});
```

## LICENSE

MIT
