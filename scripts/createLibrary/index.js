const globby = require('globby');
const mkdirp = require('make-dir');
const ora = require('ora');
const path = require('path');
const pEachSeries = require('p-each-series');

const { copyTemplateFile } = require('./copyTemplateFile');
const { initPackageManagerRoot } = require('./initPackageManagerRoot');
const { initGitRepo } = require('./initGitRepo');

module.exports = async (info) => {
  const { manager, template, name, git } = info;

  // 拆分包名称，取后一个；
  const parts = name.split('/');
  info.shortName = parts[parts.length - 1];

  // 分析包名称，并创建文件夹
  const dest = path.join(process.cwd(), info.shortName);
  info.dest = dest;
  await mkdirp(dest);

  const source = path.join(__dirname, '../../', 'template', template);
  const files = await globby(source.replace(/\\/g, '/'), {
    dot: true,
  });

  {
    const promise = pEachSeries(files, async (file) => {
      return copyTemplateFile({
        file,
        source,
        dest,
        info,
      });
    });
    ora.promise(promise, `复制 ${template} 模板到 ${dest}`);
    await promise;
  }

  {
    console.log('正在初始化npm依赖项。这需要一点时间。。。');
    const rootP = initPackageManagerRoot({ dest, info });
    ora.promise(rootP, `正在运行 ${manager} install`);
    await rootP;
  }

  if (git) {
    const promise = initGitRepo({ dest });
    ora.promise(promise, '初始化git仓库');
    await promise;
  }

  return dest;
};
