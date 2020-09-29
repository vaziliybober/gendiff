import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (formatName) => {
  switch (formatName) {
    case 'json':
      return JSON.parse;
    case 'yaml':
      return yaml.safeLoad;
    case 'ini':
      return ini.parse;
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

const parse = (data, formatName = 'json') => getParser(formatName)(data);

export default parse;
