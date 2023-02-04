const pEachSeries = require('p-each-series');
const execa = require('execa');

module.exports.initPackageManagerRoot = async (opts) => {
  const { dest, info } = opts;

  const commands = [
    {
      cmd: info.manager,
      args: ['install'],
      cwd: dest,
    },
  ];

  return pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return execa(cmd, args, { cwd });
  });
};
