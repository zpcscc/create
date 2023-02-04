import { execa } from 'execa';
import pEachSeries from '../helpers/pEachSeries.mjs';

const initPackageManagerRoot = async (opts) => {
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

export default initPackageManagerRoot;
