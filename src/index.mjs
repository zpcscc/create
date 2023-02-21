#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import fs from 'fs-extra';
import { readJson } from 'fs-extra/esm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import createLibrary from './createLibrary/index.mjs';
import getDefaultLibraryParams from './helpers/getDefaultLibraryParams.mjs';
import promptLibraryParams from './helpers/promptLibraryParams.mjs';

// 获取当前文件的绝对路径
const filename = fileURLToPath(import.meta.url);
// 获取当前文件目录绝对路径
const fileDirname = dirname(filename);
// 读取package.json文件
const { version } = await readJson(join(fileDirname, '../', 'package.json'));
// 获取默认仓库配置
const defaults = await getDefaultLibraryParams();
// 模板名称列表
const templateNameList = fs
  .readdirSync(join(fileDirname, '../', 'template'))
  .filter((name) => name !== '.DS_Store');

// 用于分析命令，解析参数。 输入 --help 会返回下列提示
program
  .name('create')
  .version(version)
  .usage('[options] [package name]')
  .option('-d, --desc <string>', 'package description', defaults.description)
  .option('-a, --author <string>', 'github 昵称', defaults.author)
  .option('-r, --repository <string>', 'package repository')
  .option('-i, --install <y/n>', '使用 <npm|yarn|pnpm> install 初始化仓库', defaults.install)
  .option('-g, --use-git <y/n>', '使用 git init 初始化仓库', defaults.git)
  .option(
    '-m, --manager <npm|yarn|pnpm>',
    '选择需要使用的包管理器',
    /^(npm|yarn|pnpm)$/,
    defaults.manager,
  )
  .option(
    `-t, --template <${templateNameList.join('|')}>`,
    '选择需要使用的模板',
    /^(react-base|react-rollup|dumi-react)$/,
    defaults.template,
  )
  .option('-s, --skip-prompts', '跳过所有问题 (必须提供包名)')
  .parse(process.argv);

const opts = {
  description: program.desc,
  author: program.author,
  repository: program.repository,
  manager: program.manager,
  template: program.template,
  skipPrompts: program.skipPrompts,
  install: program.install,
  git: program.git,
};

// 为opts中的未填项赋默认值
Object.keys(opts).forEach((key) => {
  if (!opts[key] && defaults[key]) {
    opts[key] = defaults[key];
  }
});

// 若只有一个参数，则赋值给包名
if (program.args.length === 1) {
  opts.name = program.args[0];
} else if (program.args.length > 1) {
  // args参数大于1，则格式错误
  console.error('无效的参数格式');
  program.help();
  process.exit(1);
}

// 询问用户并处理参数
const params = await promptLibraryParams(opts);

// 创建仓库
const dest = await createLibrary(params);

console.log(`
    您的 package 创建在 ${dest}.

    开始运行，复制以下命令到终端执行:
    $ ${chalk.cyan(`cd ${params.shortName} && ${params.manager} start`)}
  `);
