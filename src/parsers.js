import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (extension) => {
  switch (extension) {
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      return JSON.parse;
  }
};

export default getParser;
