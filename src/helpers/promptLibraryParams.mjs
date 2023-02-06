import inquirer from 'inquirer';
import validateNpmName from 'validate-npm-package-name';
import getConfig from './getConfigs.mjs';

const promptLibraryParams = async (opts) => {
  const config = getConfig();
  if (opts.name && !validateNpmName(opts.name).validForNewPackages) {
    throw new Error(`无效的名称 "${opts.name}"`);
  }

  if (opts.skipPrompts) {
    if (!opts.name) {
      throw new Error(
        '缺少 package name，使用 -s 或 --skip-prompts 来跳过选择时必须提供 package name',
      );
    }

    Object.keys(opts).forEach((key) => {
      const value = opts[key];
      if (typeof value === 'function') {
        opts[key] = value(opts);
      }
    });

    return opts;
  }

  // 搭建脚手架时，向用户询问的问题
  const info = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Package name',
      validate: (name) => {
        return name && validateNpmName(name).validForNewPackages;
      },
      default: opts.name,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Package Description',
      default: opts.description,
    },
    {
      type: 'input',
      name: 'author',
      message: 'Package author',
      default: opts.author,
    },
    {
      type: 'input',
      name: 'repository',
      message: 'Package repository',
      default: opts.repository,
    },
    {
      type: 'list',
      name: 'template',
      message: '请选择模板',
      choices: ['react-base', 'react-rollup', 'dumi-react'],
      default: opts.template,
    },
    {
      type: 'list',
      name: 'manager',
      message: '请选择包管理器',
      choices: ['npm', 'yarn', 'pnpm'],
      default: opts.manager,
    },
    {
      type: 'input',
      name: 'install',
      message: '使用 <npm|yarn|pnpm> install 安装依赖 <y/n>',
      default: opts.install,
    },
    {
      type: 'input',
      name: 'git',
      message: '使用 git init 初始化 package <y/n>',
      default: opts.git,
    },
  ]);

  config.set('author', info.author);
  config.set('manager', info.manager);
  config.set('template', info.template);
  config.set('install', info.install);
  config.set('git', info.git);

  return info;
};

export default promptLibraryParams;
