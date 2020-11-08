import yaml from 'js-yaml';
import ini from 'ini';

const formatParserMap = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data, formatName = 'json') => formatParserMap[formatName](data);

export default parse;
