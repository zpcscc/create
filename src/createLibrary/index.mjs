import { globby } from 'globby';
import mkdirp from 'make-dir';
import ora from 'ora';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import copyTemplateFile from './copyTemplateFile.mjs';
import initGitRepo from './initGitRepo.mjs';
import initPackageManagerRoot from './initPackageManagerRoot.mjs';

const filename = fileURLToPath(import.meta.url);
const fileDirname = dirname(filename);

const createLibrary = async (info) => {
  const { manager, template, name, git, install } = info;

  // 拆分包名称，取后一个；
  const parts = name.split('/');
  info.shortName = parts[parts.length - 1];

  // 分析包名称，并创建文件夹
  const dest = join(process.cwd(), info.shortName);
  info.dest = dest;
  await mkdirp(dest);

  // 找到模板资源文件
  const source = join(fileDirname, '../../', 'template', template);
  // 解析模板中每个文件
  const files = await globby(source.replace(/\\/g, '/'), {
    dot: true,
  });

  // 克隆模板
  const copySpinner = ora(`复制 ${template} 模板到 ${dest}`).start();
  await files.map((file) => {
    return copyTemplateFile({
      file,
      source,
      dest,
      info,
    });
  });
  copySpinner.succeed();

  // 安装依赖
  if (install === 'y') {
    const installSpinner = ora(`执行 ${manager} install ,这需要一点时间。。。`).start();
    await initPackageManagerRoot({ dest, info });
    installSpinner.succeed();
  }

  // 初始化git
  if (git === 'y') {
    const gitSpinner = ora('初始化git仓库').start();
    await initGitRepo({ dest });
    gitSpinner.succeed();
  }

  return dest;
};
export default createLibrary;
