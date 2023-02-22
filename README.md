# @dxsixpc/create

[![NPM version](https://img.shields.io/npm/v/@dxsixpc/create.svg?style=flat)](https://npmjs.org/package/@dxsixpc/create)
[![NPM downloads](http://img.shields.io/npm/dm/@dxsixpc/create.svg?style=flat)](https://npmjs.org/package/@dxsixpc/create)

## 简介

### 前端项目脚手架

> 快速生成 react 项目

## 使用

#### 全局安装

```shell
npm install -g @dxsixpc/create
```

全局安装完成后，可直接使用 create 命令

```shell
create
```


#### 通过 npx 直接使用

```shell
npx @dxsixpc/create
```


#### 命令参数

```shell
npx @dxsixpc/create --help
```


## 开发

### 脚手架开发

#### 脚手架调试运行

##### 方式一：

```shell
// 将本地项目链接到全局
npm link
// 全局可使用create命令执行
create
```

##### 方式二：

```shell
// 直接使用node运行代码
node src/index.mjs
```

#### 脚手架代码打包发布

```shell
// 打包
npm run build
// 发布
npm publish
```

### 文档开发

#### 文档调试运行

```shell
npm run start
或
npm run dev
```

#### 文档打包

```shell
npm run docs:build
```

#### 文档发布

```shell
npm run docs:deploy
```

#### 文档一键打包发布

```shell
npm run deploy
```

## License

MIT © [dxsixpc](https://github.com/dxsixpc)
