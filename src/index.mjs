#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { readJson } from 'fs-extra/esm';
import { resolve } from 'path';
import createLibrary from './createLibrary/index.mjs';
import getDefaultLibraryParams from './helpers/get-default-library-params.mjs';
import promptLibraryParams from './helpers/prompt-library-params.mjs';

// 读取package.json文件
const { version } = await readJson(resolve('package.json'));
const defaults = await getDefaultLibraryParams();

// 用于分析命令，解析参数
program
  .name('create')
  .version(version)
  .usage('[options] [package name]')
  .option('-d, --desc <string>', 'package description', defaults.description)
  .option('-a, --author <string>', 'package author', defaults.author)
  .option('-l, --license <string>', 'package license', defaults.license)
  .option('-r, --repository <string>', 'package repository')
  .option('-g, --no-git', '不使用 git init')
  .option('-m, --manager <npm|yarn>', '选择需要使用的包管理器', /^(npm|yarn)$/, defaults.manager)
  .option(
    '-t, --template <dumi-react|react-base|react-rollup>',
    '选择需要使用的模板',
    /^(dumi-react|react-base|react-rollup)$/,
    defaults.template,
  )
  .option('-s, --skip-prompts', '跳过所有提示 (必须提供包名)')
  .parse(process.argv);

const opts = {
  description: program.desc,
  author: program.author,
  license: program.license,
  repository: program.repository,
  manager: program.manager,
  template: program.template,
  skipPrompts: program.skipPrompts,
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
    您的包创建在 ${dest}.

    开始运行，输入以下命令:
    $ ${chalk.cyan(
      `cd ${params.shortName} && ${params.manager} start`,
    )}
  `);
