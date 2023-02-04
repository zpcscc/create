import fs from 'fs-extra';
import mkdirp from 'make-dir';
import path from 'path';

// 模板文件黑名单。不需要导出的具体文件
const templateBlacklist = new Set(['.git', 'dist', 'package-lock.json']);

// 复制模板文件
const copyTemplateFile = async (opts) => {
  const { file, source, dest, info } = opts;
  const { name, description, repository, license, author } = info || {};

  const fileRelativePath = path.relative(source, file).replace(/\\/g, '/');

  if (fileRelativePath.startsWith('.git') || fileRelativePath.startsWith('node_modules')) {
    return;
  }

  const destFilePath = path.join(dest, fileRelativePath);
  const destFileDir = path.parse(destFilePath).dir;

  await mkdirp(destFileDir);

  if (!templateBlacklist.has(fileRelativePath)) {
    const content = fs.readFileSync(file);
    if (fileRelativePath === 'package.json') {
      const pakg = await fs.readJson(file);
      const newPakg = {
        ...pakg,
        name,
        description,
        repository,
        license,
        author,
      };
      await fs.outputJSON(destFilePath, newPakg, { spaces: 2 });
    } else {
      fs.writeFileSync(destFilePath, content, 'utf8');
    }
  }
  return fileRelativePath;
};

export default copyTemplateFile;
