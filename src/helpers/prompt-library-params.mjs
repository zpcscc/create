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
      throw new Error('无效输入，必须使用 --skip-prompts 来跳过选择');
    }

    Object.keys(opts).forEach((key) => {
      const value = opts[key];
      if (typeof value === 'function') {
        opts[key] = value(opts);
      }
    });

    return opts;
  }
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
      message: '作者',
      default: opts.author,
    },
    {
      type: 'input',
      name: 'repository',
      message: 'GitHub 仓库链接',
      default: opts.repository,
    },
    {
      type: 'input',
      name: 'license',
      message: 'License',
      default: opts.license,
    },
    {
      type: 'list',
      name: 'manager',
      message: '请选择包管理器',
      choices: ['npm', 'yarn'],
      default: opts.manager,
    },
    {
      type: 'list',
      name: 'template',
      message: '请选择模板',
      choices: ['dumi-react', 'react-base', 'react-rollup'],
      default: opts.template,
    },
  ]);

  config.set('author', info.author);
  config.set('license', info.license);
  config.set('manager', info.manager);
  config.set('template', info.template);

  return {
    ...info,
    git: opts.git,
  };
};

export default promptLibraryParams;
