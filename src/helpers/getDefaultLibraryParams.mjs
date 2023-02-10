import getGitConfigPath from 'git-config-path';
import githubUsername from 'github-username';
import parseGitConfig from 'parse-git-config';
import getConfig from './getConfigs.mjs';

const getDefaultLibraryParams = async () => {
  const config = getConfig();
  const defaults = {
    name: '',
    description: 'Made with @dxsixpc/create',
    author: config.get('author'),
    repository: (info) => `https://github.com/${info.author}/${info.name}`,
    manager: config.get('manager', 'npm'),
    template: config.get('template', 'react-base'),
    install: config.get('install', true),
    git: config.get('git', true),
  };

  try {
    // 设置作者名称
    if (!config.get('author')) {
      const gitConfigPath = getGitConfigPath('global');
      if (gitConfigPath) {
        const gitConfig = parseGitConfig.sync({ path: gitConfigPath });
        if (gitConfig.github && gitConfig.github.user) {
          defaults.author = gitConfig.github.user;
        } else if (gitConfig.user && gitConfig.user.email) {
          defaults.author = await githubUsername(gitConfig.user.email);
        }
      }
      if (defaults.author) {
        config.set('author', defaults.author);
      }
    }

    // 设置包管理器
    if (!config.get('manager')) {
      config.set('manager', defaults.manager);
    }

    // 设置模板值
    if (!config.get('template')) {
      config.set('template', defaults.template);
    }

    // 设置git值
    if (!config.get('git')) {
      config.set('git', defaults.git);
    }

    // 设置install值
    if (!config.get('install')) {
      config.set('install', defaults.install);
    }
  } catch (err) {
    console.log(err);
  }

  return defaults;
};

export default getDefaultLibraryParams;
