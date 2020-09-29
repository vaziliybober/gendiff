import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (name) => {
  switch (name) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Unknown format: ${name}`);
  }
};

const format = (diffStructure, formatName) => getFormatter(formatName)(diffStructure);

export default format;
