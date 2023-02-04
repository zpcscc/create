import getGitConfigPath from 'git-config-path';
import githubUsername from 'github-username';
import parseGitConfig from 'parse-git-config';
import which from 'which';
import getConfig from './getConfigs.mjs';

const getDefaultLibraryParams = async () => {
  const config = getConfig();
  const defaults = {
    name: '',
    description: 'Made with @dxsixpc/create',
    author: config.get('author'),
    repository: (info) => `${info.author}/${info.name}`,
    license: config.get('license', 'MIT'),
    manager: config.get('manager', 'npm'),
    template: config.get('template', 'react-base'),
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
      if (which.sync('yarn', { nothrow: true })) {
        defaults.manager = 'yarn';
      }
      config.set('manager', defaults.manager);
    }

    // 设置模板值
    if (!config.get('template')) {
      config.set('template', defaults.template);
    }
  } catch (err) {
    console.log(err);
  }

  return defaults;
};

export default getDefaultLibraryParams;
