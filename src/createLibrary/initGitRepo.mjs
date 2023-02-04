import { execa } from 'execa';
import pEachSeries from '../helpers/pEachSeries.mjs';

const initGitRepo = async (opts) => {
  const { dest } = opts;

  const commands = [
    {
      cmd: 'git',
      args: ['init'],
      cwd: dest,
    },
    {
      cmd: 'git',
      args: ['add', '.'],
      cwd: dest,
    },
  ];

  return pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return execa(cmd, args, { cwd });
  });
};

export default initGitRepo;
