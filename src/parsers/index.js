import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (formatName) => {
  switch (formatName) {
    case 'yaml':
      return yaml.safeLoad;
    case 'ini':
      return ini.parse;
    default:
      return JSON.parse;
  }
};

const parse = (data, formatName = 'json') => getParser(formatName)(data);

export default parse;
