import fs from 'fs';
import path from 'path';
import genDiffStructure from './genDiffStructure.js';
import format from './formatters/index.js';
import parse from './parsers/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const getFileFormat = (filepath) => {
  const extension = path.extname(filepath);

  switch (extension) {
    case '.json':
      return 'json';
    case '.yml':
      return 'yaml';
    case '.ini':
      return 'ini';
    default:
      throw new Error('Extension not supported: ' + extension);
  }
};

const parseFile = (filepath) => {
  const rawData = readFile(filepath);
  const fileForamt = getFileFormat(filepath);
  return parse(rawData, fileForamt);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diffStructure = genDiffStructure(obj1, obj2);
  return format(diffStructure, formatName);
};

export default genDiff;
