import Conf from 'conf';

const getConfig = (projectName = 'foo') => {
  return new Conf({ projectName });
};

export default getConfig;
