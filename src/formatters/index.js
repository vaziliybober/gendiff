import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatFormatterMap = {
  stylish,
  plain,
  json,
};

const format = (diffStructure, formatName) => formatFormatterMap[formatName](diffStructure);

export default format;
